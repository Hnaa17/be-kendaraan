const {
    insert,
    allVehicle,
    detail,
    updateVehicle,
    deleteVehicle,
    countVehicle
} = require('../models/kendaraan');
const {success, failed} = require('../helper/response');

const vehicleController = {
    insertVehicle: async (req, res) => {
        try {
            const {no_reg, name, address, merk, production_year, capacity, color, fuel} = req.body;
            const data = {
                no_reg, 
                name, 
                address, 
                merk, 
                production_year, 
                capacity, 
                color, 
                fuel
            };
            await insert(data)
            success(res, {
                code: 200,
                status: 'success',
                message: 'New vehicle has been created',
                data: data,
            });
        } catch(error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error,
                error: [],
            });
        }
    },
    getAll: async (req, res) => {
        try {
            const { search } = req.query;
            const searchQuery = search || '';
            const result = await allVehicle ({
                searchQuery,
            });
            const allData = await countVehicle();
            const totalData = allData.rows[0].total;
            if(search) {
                if (result.rowCount > 0) {
                    success(res, {
                        code: 200,
                        status: 'success',
                        message: 'Success get all vehicle',
                        data: result.rows,
                    });
                } else {
                    failed(res, {
                        code: 500,
                        status: 'error',
                        message: `vehicle with keyword ${search} is not found`,
                        error: [],
                    });
                }
            } else {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `Success get all vehicle`,
                    data: result.rows,
                });
            }
        } catch(error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    getSearch: async (req, res) => {
        try {
            // const {no_reg} = req.params;
            const {no_reg, name} = req.body;
            const {rows:[vehicle]} = await detail(no_reg);
            // const result = await detail(no_reg);
            // if (result.rowCount > 0) {
            //     success(res, {
            //         code: 200,
            //         status: 'success',
            //         message: 'Success get vehicle by id',
            //         data: result.rows[0],
            //     });
            // } else {
            //     failed(res, {
            //         code: 404,
            //         status: 'error',
            //         message: `vehicle with registration number ${no_reg} is not found`,
            //         error: [],
            //     });
            // }
            if (vehicle == '' || name == '') {
                failed(res, {
                    code: 403,
                    status: 'error',
                    message: `no_reg and name must be filled`,
                    error: [],
                });
            } else if(!vehicle) {
                failed(res, {
                    code: 403,
                    status: 'error',
                    message: `vehicle with registration number ${no_reg} is not found`,
                    error: [],
                });
            } else if (name != vehicle.name) {
                failed(res, {
                    code: 403,
                    status: 'error',
                    message: `vehicle with owner ${name} is not found`,
                    error: [],
                });
            } else if (no_reg == vehicle.no_reg && name == vehicle.name) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get vehicle',
                    data: vehicle,
                });
            } 
        } catch(error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    getDetail: async (req, res) => {
        try {
            const {no_reg} = req.params;
            const result = await detail(no_reg);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get vehicle by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `vehicle with registration number ${no_reg} is not found`,
                    error: [],
                });
            }
        } catch(error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    updateData: async (req, res) => {
        try {
            const { no_reg } = req.params;
            const { name, address, merk, production_year, capacity, color, fuel } = req.body;
            const vehicleCheck = await detail(no_reg);
            if (vehicleCheck.rowCount > 0) {
                const data = {
                    no_reg,
                    name, 
                    address, 
                    merk, 
                    production_year, 
                    capacity, 
                    color, 
                    fuel,
                };
                await updateVehicle(data);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success update vehicle',
                    data: data,
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `vehicle with registration number ${no_reg} is not found`,
                    error: [],
                });
                return;
            }
        } catch(error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    deleteData: async (req, res) => {
        try {
            const { no_reg } = req.params;
            const detailVehicle = await detail(no_reg);
            if (detailVehicle.rowCount > 0) {
                await deleteVehicle(no_reg);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `success deleted vehicle with registration number ${no_reg}`,
                });
                return;
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `vehicle with registration number ${no_reg} is not found`,
                    error: [],
                });
                return;
            }
        } catch(error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    }
}

module.exports = vehicleController;