import * as businessRepository from '../repositories/businessRepository'
import * as cardRepository from '../repositories/cardRepository'

export async function checkBusinessIdAndType(cardId: number,businessId: number){
    const card = await cardRepository.findById(cardId)
    const business = await businessRepository.findById(businessId)
    if(!business){
        throw {code:'NotFound', message: 'No businesses were found with given id'}
    }
    if(business.type!==card.type) {
        throw {code:'Conflict', message: 'Type of business do not match type of card'}
    }
}