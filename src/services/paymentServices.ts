import * as paymentRepository from '../repositories/paymentRepository'
import * as rechargeRepository from '../repositories/rechargeRepository'


export async function getBalance(cardId: number):Promise<any> {
    const transactions = await paymentRepository.findByCardId(cardId)
    const recharges = await rechargeRepository.findByCardId(cardId)
    const sumPayments = getSum(transactions)
    const sumRecharges = getSum(recharges)
    return ({
        balance:sumRecharges-sumPayments,
        transactions,
        recharges
    })
}

function getSum(arr: Array<any>):number {
    let sum = 0
    if (arr.length > 0) {
        arr.map((x: any) => sum += x.amount)
    }
    return sum
}

export async function addPurchase(cardId:number,amount:number,businessId:number) {
    const {balance} = await getBalance(cardId)
    if(balance<amount){
        throw {code:'Conflict', message:'Not enough income to fulfill purchase'}
    }
    await paymentRepository.insert({cardId,businessId,amount})
}