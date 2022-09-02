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
    const securityCode = getEncryptedCode()

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

function getEncryptedCode(): string {
    const secretCode = faker.finance.creditCardCVV()
    console.log(secretCode)
    const CRYPTR_KEY = process.env.CRYPTR_KEY || 'secret'
    const cryptr = new Cryptr(CRYPTR_KEY)
    return cryptr.encrypt(secretCode)
}


export async function cardVerify(id: number, securityCode: string) {
    const card = await cardRepository.findById(Number(id))
    
    if (!card) {
        throw { code: 'NotFound', message: 'No cards were found with given id' }
    }
        const expDate = dayjs(card.expirationDate, 'MM/YY');
        if (expDate < dayjs()) {
            throw { code: 'Conflict', message: 'Expired card can not be activated' }
        }
        if (card.password && card.password.length > 0) {
            throw { code: 'Conflict', message: 'Card already activated' }
        }
        const CRYPTR_KEY = process.env.CRYPTR_KEY || 'secret'
        const cryptr = new Cryptr(CRYPTR_KEY)
        const decryptedCode = cryptr.decrypt(card.securityCode)
        console.log(decryptedCode)
        if (decryptedCode !== securityCode) {
            throw { code: 'Unauthorized', message: 'Incorrect id or security code' }
        }
    
}

export async function activateCard(id: number, securityCode: string, rawPassword: string) {
    await cardVerify(id, securityCode)
    const password = passwordVerify(rawPassword)
    await cardRepository.update(id, { password })
}

function passwordVerify(str: string) {
    const BCRYPT_SALT = process.env.BCRYPT_SALT || 10
    const regex = /^[0-9]{4}$/
    if (regex.test(str)) {
        return bcrypt.hashSync(str, Number(BCRYPT_SALT))
    } else {
        throw { code: 'InvalidInput', message: 'Password must be 4 numbers' }
    }
}