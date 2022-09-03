import * as rechargeRepository from '../repositories/rechargeRepository'

export async function addRecharge (cardId:number, amount:number) {
    await rechargeRepository.insert({cardId,amount})
}