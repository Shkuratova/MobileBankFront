import '@testing-library/react';
import '@testing-library/jest-dom'

import $api from "../../../http";
import PersonService from "../../../service/PersonService";
describe('mock api',()=> {
    it('should get user-data', async () => {
        const Expected = {
            status: 200, data: {
                first_name: "Отто",
                second_name: "Бисмарк",
                third_name: "фон",
                sex: "male",
                birthday: "1905-05-12",
                phone_number: "+798854789611",
                email: "test@gmail.com",
                login: "bismark"
            }
        }
        jest.spyOn($api, 'get').mockResolvedValue(Expected)
        const response = await PersonService.personInfo()
        expect(response).toEqual(Expected)
    })
})


