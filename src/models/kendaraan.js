const pool = require('../config/db');

const insert = (data) => {
    const {no_reg, name, address, merk, production_year, capacity, color, fuel} = data;
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO vehicle (no_reg, name, address, merk, production_year, capacity, color, fuel) VALUES ('${no_reg}', '${name}', '${address}', '${merk}', ${production_year}, ${capacity}, '${color}', '${fuel}')`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const allVehicle = ({searchQuery}) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM vehicle WHERE LOWER(no_reg) LIKE '%${searchQuery}%'`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const detail = (no_reg) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM vehicle WHERE no_reg='${no_reg}'`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const updateVehicle = (data) => {
    const {no_reg, name, address, merk, production_year, capacity, color, fuel} = data;
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE vehicle SET name='${name}', address='${address}', merk='${merk}', production_year=${production_year}, capacity=${capacity}, color='${color}', fuel='${fuel}' WHERE no_reg='${no_reg}'`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const deleteVehicle = (no_reg) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM vehicle WHERE no_reg='${no_reg}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const countVehicle = () => {
    return new Promise ((resolve, reject) => {
        pool.query(`SELECT COUNT(*) AS total FROM vehicle`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

module.exports = {
    insert,
    allVehicle,
    detail,
    updateVehicle,
    deleteVehicle,
    countVehicle
}