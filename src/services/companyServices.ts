import * as companyRepository from '../repositories/companyRepository'

export async function companyVerify (apiKey:string) {
    const company = await companyRepository.findByApiKey(apiKey)
    if(!company.name){
        throw {code:'NotFound',message:'No companies were found with given api key'}
    }
}

