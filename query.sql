CREATE DATABASE data_kendaraan;

CREATE TABLE vehicle (
    no_reg text primary key,
    name text NOT NULL,
    address text,
    merk text,
    production_year numeric(4,0),
    capacity numeric,
    color text,
    fuel text
);

INSERT INTO vehicle (no_reg, name, address, merk, production_year, capacity, color, fuel) VALUES ('B-7763-TXY', 'Lionel Messi', 'JL. Achmad Yani No 89 Jakarta Pusat', 'Honda PCX', 2018, 150, 'Merah', 'Bensin')

{
    "no_reg": "B-7763-TXY", 
    "name": "Lionel Messi", 
    "address": "JL. Achmad Yani No 89 Jakarta Pusat", 
    "merk": "Honda PCX", 
    "production_year": 2018, 
    "capacity": 150, 
    "color": "Merah", 
    "fuel": "Bensin"
}