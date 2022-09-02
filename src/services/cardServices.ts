import * as cardRepository from '../repositories/cardRepository'
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import Cryptr from 'cryptr';

export async function createNewCard(employeeId:number,employeeName:string, type:cardRepository.TransactionTypes) {
    
    const cardholderName=formatName(employeeName)
    const expirationDate=createExpDate()
    const number = faker.finance.creditCardNumber()
    const securityCode = getEncryptedCode()

    const cardData:cardRepository.CardInsertData = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password:undefined,
    isVirtual:false,
    originalCardId:undefined,
    isBlocked:false,
    type,
    }
    await cardRepository.insert(cardData)
}

function formatName(str:string):string{
    const separateNames = str.split(" ")
    let formattedName = []
    for(let i=0; i<separateNames.length; i++){
        if(i===0||i===separateNames.length-1){
            formattedName.push(separateNames[i].toUpperCase())
        } else if (separateNames[i].length>2){
            formattedName.push(separateNames[i][0].toUpperCase())
        }
    }
    return formattedName.join(" ")
}

function createExpDate():string{
    const now = dayjs()
    return now.add(5,'years').format('MM/YY')
}

function getEncryptedCode ():string {
    const secretCode = faker.finance.creditCardCVV()
    const CRYPTR_KEY = process.env.CRYPTR_KEY || 'secret'
    const cryptr = new Cryptr(CRYPTR_KEY)
    return cryptr.encrypt(secretCode)
}