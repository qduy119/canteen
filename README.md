# Welcome to CANTEEN-HCMUS

## I. Set up

### 1. Install local module using npm

-   Backend

```
$ cd backend
$ npm install
```

-   Frontend

```
$ cd frontend
$ npm install
```

### 2. Migrations and seeds

-   Create database `canteen` in MySQL Workbench:
-   Then run this command:

```
$ cd backend/src
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
```

-   Account for administration:

```
email: admin@admin.com
password: admin
```

### 3. Run this project:

-   Backend

```
$ cd backend
$ npm start
```

-   Frontend

```
$ cd frontend
$ npm run dev
```

## II. VNPAY card information for testing (currently available for NCB Bank only)

### 1

Ngân hàng: NCB
Số thẻ: 9704198526191432198
Tên chủ thẻ:NGUYEN VAN A
Ngày phát hành:07/15
Mật khẩu OTP:123456
`Thành công`

### 2

Ngân hàng: NCB
Số thẻ: 9704195798459170488
Tên chủ thẻ:NGUYEN VAN A
Ngày phát hành:07/15
`Thẻ không đủ số dư`

### 3

Ngân hàng: NCB
Số thẻ: 9704192181368742
Tên chủ thẻ:NGUYEN VAN A
Ngày phát hành:07/15
`Thẻ chưa kích hoạt`

### 4

Ngân hàng: NCB
Số thẻ: 9704193370791314
Tên chủ thẻ:NGUYEN VAN A
Ngày phát hành:07/15
`Thẻ bị khóa`

### 5

Ngân hàng: NCB
Số thẻ: 9704194841945513
Tên chủ thẻ:NGUYEN VAN A
Ngày phát hành:07/15
`Thẻ bị hết hạn`

### 6

Loại thẻ quốc tế VISA (No 3DS)
Số thẻ: 4456530000001005
CVC/CVV: 123
Tên chủ thẻ:NGUYEN VAN A
Ngày hết hạn:12/24
Email:test@gmail.com
Địa chỉ:22 Lang Ha
Thành phố:Ha Noi
`Thành công`

### 7

Loại thẻ quốc tếVISA (3DS)
Số thẻ: 4456530000001096
CVC/CVV: 123
Tên chủ thẻ:NGUYEN VAN A
Ngày hết hạn:12/24
Email:test@gmail.com
Địa chỉ:22 Lang Ha
Thành phố:Ha Noi
`Thành công`

### 8

Loại thẻ quốc tế MasterCard (No 3DS)
Số thẻ: 5200000000001005
CVC/CVV: 123
Tên chủ thẻ:NGUYEN VAN A
Ngày hết hạn:12/24
Email:test@gmail.com
Địa chỉ:22 Lang Ha
Thành phố:Ha Noi
`Thành công`

### 9

Loại thẻ quốc tế MasterCard (3DS)
Số thẻ: 5200000000001096
CVC/CVV: 123
Tên chủ thẻ:NGUYEN VAN A
Ngày hết hạn:12/24
Email:test@gmail.com
Địa chỉ:22 Lang Ha
Thành phố:Ha Noi
`Thành công`

### 10

Loại thẻ quốc tế JCB (No 3DS)
Số thẻ: 3337000000000008
CVC/CVV: 123
Tên chủ thẻ:NGUYEN VAN A
Ngày hết hạn:12/24
Email:test@gmail.com
Địa chỉ:22 Lang Ha
Thành phố:Ha Noi
`Thành công`

### 11

Loại thẻ quốc tế JCB (3DS)
Số thẻ: 3337000000200004
CVC/CVV: 123
Tên chủ thẻ:NGUYEN VAN A
Ngày hết hạn:12/24
Email:test@gmail.com
Địa chỉ:22 Lang Ha
Thành phố:Ha Noi
`Thành công`

### 12

Loại thẻ ATM nội địa Nhóm Bank qua NAPAS
Số thẻ: 9704000000000018
Số thẻ: 9704020000000016
Tên chủ thẻ:NGUYEN VAN A
Ngày phát hành:03/07
OTP:otp
`Thành công`

### 13

Loại thẻ ATM nội địa EXIMBANK
Số thẻ: 9704310005819191
Tên chủ thẻ:NGUYEN VAN A
Ngày hết hạn:10/26
`Thành công`
