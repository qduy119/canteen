"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // Define instance methods
        async correctPassword(userPassword) {
            if (this.password) {
                return await bcrypt.compare(userPassword, this.password);
            }
            return false;
        }
        static associate(models) {
            // define association here
            User.hasMany(models.CartItem, {
                foreignKey: "userId",
                as: "cartItems",
            });
            User.hasMany(models.Order, {
                foreignKey: "userId",
                as: "orders",
            });
            User.hasMany(models.Payment, {
                foreignKey: "userId",
                as: "payments",
            });
            User.hasMany(models.Review, {
                foreignKey: "userId",
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            email: DataTypes.TEXT,
            password: DataTypes.TEXT,
            provider: {
                type: DataTypes.TEXT,
                defaultValue: "default",
            },
            phoneNumber: DataTypes.TEXT,
            fullName: DataTypes.TEXT,
            avatar: {
                type: DataTypes.TEXT,
                defaultValue:
                    "https://res.cloudinary.com/dlzyiprib/image/upload/v1694617729/e-commerces/user/kumz90hy8ufomdgof8ik.jpg",
            },
            gender: DataTypes.TEXT,
            dateOfBirth: DataTypes.DATE,
            role: {
                type: DataTypes.TEXT,
                defaultValue: "Customer",
                validate: {
                    isIn: {
                        args: [["Customer", "Admin", "Employee"]],
                        msg: "Must be Customer, Employee or Admin",
                    },
                },
            },
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "User",
            timestamps: false,
        }
    );
    User.beforeSave(async (user) => {
        const salt = await bcrypt.genSalt(16);
        if (user.password) {
            user.password = await bcrypt.hash(user.password, salt);
        }
    });
    return User;
};
