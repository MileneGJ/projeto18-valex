import * as employeeRepository from '../repositories/employeeRepository'
import * as cardRepository from '../repositories/cardRepository'

export async function employeeVerifyForNewCard (id:number,type:cardRepository.TransactionTypes) {
    const employee = await employeeRepository.findById(id)
    if(!employee){
        throw {code:'NotFound',message:'No employees were found with given id'}
    }
    const existingCard = await cardRepository.findByTypeAndEmployeeId(type,id)
    if(existingCard){
        throw {code:'Conflict', message:'Card type already exists for this employee'}
    }
    return employee
}