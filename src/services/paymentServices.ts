import * as paymentRepository from '../repositories/paymentRepository'
import * as rechargeRepository from '../repositories/rechargeRepository'


export async function getBalance(cardId: number) {
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

function getSum(arr: Array<any>) {
    let sum = 0
    if (arr.length > 0) {
        arr.map((x: any) => sum += x.amount)
    }
    return sum
}