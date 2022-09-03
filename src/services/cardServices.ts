import * as cardRepository from '../repositories/cardRepository'
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat)

export async function createNewCard(employeeId: number, employeeName: string, type: cardRepository.TransactionTypes) {

    const cardholderName = formatName(employeeName)
    const expirationDate = createExpDate()
    const number = faker.finance.creditCardNumber()
    const rawSecurityCode = faker.finance.creditCardCVV()
    const securityCode = cryptString(rawSecurityCode, 'encrypt')

    const cardData: cardRepository.CardInsertData = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: undefined,
        isVirtual: false,
        originalCardId: undefined,
        isBlocked: false,
        type,
    }
    await cardRepository.insert(cardData)
}

function formatName(str: string): string {
    const separateNames = str.split(" ")
    let formattedName = []
    for (let i = 0; i < separateNames.length; i++) {
        if (i === 0 || i === separateNames.length - 1) {
            formattedName.push(separateNames[i].toUpperCase())
        } else if (separateNames[i].length > 2) {
            formattedName.push(separateNames[i][0].toUpperCase())
        }
    }
    return formattedName.join(" ")
}

function createExpDate(): string {
    const now = dayjs()
    return now.add(5, 'years').format('MM/YY')
}

function cryptString(str: string, method: string): string {
    const CRYPTR_KEY = process.env.CRYPTR_KEY || 'secret'
    const cryptr = new Cryptr(CRYPTR_KEY)
    switch (method) {
        case 'decrypt':
            return cryptr.decrypt(str);
        default:
            return cryptr.encrypt(str);
    }
}


export async function activateCard(id: number, securityCode: string, rawPassword: string) {
    const card = await cardExistsVerify(id)
    activationVerify(card,'activate')
    expirationVerify(card)
    securityVerify(card, securityCode)
    const password = passwordValidate(rawPassword)
    await cardRepository.update(id, { password })
}

export async function cardExistsVerify(id: number): Promise<any> {
    const card = await cardRepository.findById(Number(id))
    if (!card) {
        throw { code: 'NotFound', message: 'No cards were found with given id' }
    }
    return card;
}

function activationVerify(card: any, action: string) {
    switch (action) {
        case 'activate':
            if (card.password && card.password.length > 0) {
                throw { code: 'Conflict', message: 'Card already activated' }
            } else break
        default:
            if (!card.password || card.password.length === 0) {
                throw { code: 'Conflict', message: 'Action not allowed for unactive card' }
            } else break
    }

}

export function expirationVerify(card: any) {
    const expDate = dayjs(card.expirationDate, 'MM/YY');
    if (expDate < dayjs()) {
        throw { code: 'Conflict', message: 'Action not allowed for expired card' }
    }
}

function securityVerify(card: any, securityCode: string) {
    const decryptedCode = cryptString(card.securityCode, 'decrypt')
    console.log(decryptedCode)
    if (decryptedCode !== securityCode) {
        throw { code: 'Unauthorized', message: 'Incorrect card id or security code' }
    }

}

function passwordValidate(str: string): string {
    const regex = /^[0-9]{4}$/
    if (regex.test(str)) {
        return cryptString(str, 'encrypt')
    } else {
        throw { code: 'InvalidInput', message: 'Password must be 4 numbers' }
    }
}

export async function blockCard(cardId: number, password: string) {
    const card = await cardExistsVerify(cardId)
    expirationVerify(card)
    blockVerify(card, 'block')
    passwordVerify(card, password)
    await cardRepository.update(cardId, { isBlocked: true })
}

export async function unblockCard(cardId: number, password: string) {
    const card = await cardExistsVerify(cardId)
    expirationVerify(card)
    blockVerify(card, 'unblock')
    passwordVerify(card, password)
    await cardRepository.update(cardId, { isBlocked: false })
}

function blockVerify(card: any, method: string) {
    switch (method) {
        case 'checking':
            if (card.isBlocked) {
                throw { code: 'Conflict', message: 'Action not allowed for blocked card' }
            } else break
        case 'unblock':
            if (!card.isBlocked) {
                throw { code: 'Conflict', message: 'Card is already unblocked' }
            } else break
        default:
            if (card.isBlocked) {
                throw { code: 'Conflict', message: 'Card is already blocked' }
            } else break
    }
}

function passwordVerify(card: any, password: string) {
    const decryptPassword = cryptString(card.password, 'decrypt')
    if (decryptPassword !== password) {
        throw { code: 'Unauthorized', message: 'Incorrect card id or password' }
    }
}

export async function conditionsForTransactions(cardId: number,type: string, password:string) {
    const card = await cardExistsVerify(Number(cardId))
    activationVerify(card,'checking')
    expirationVerify(card)
    if(type==='purchase'){
        blockVerify(card,'checking')
        passwordVerify(card,password)
    }
}