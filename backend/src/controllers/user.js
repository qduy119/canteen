const UserService = require("../services/User");

class UserController {
    constructor() {
        this._userService = new UserService();
    }

    getMe = async (req, res) => {
        try {
            const { id } = req.user;
            const data = await this._userService.getById(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this._userService.getById(id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    getAll = async (req, res) => {
        try {
            const data = await this._userService.getAll();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            await this._userService.update(id, payload);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            await this._userService.delete(id);
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    authenticate = async (req, res) => {
        try {
            const data = await this._userService.authenticate(req, res);
            return data;
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    register = async (req, res) => {
        try {
            const data = await this._userService.register(req, res);
            return data;
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    logout = (req, res) => {
        try {
            return this._userService.logout(res);
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    refresh = (req, res) => {
        try {
            return this._userService.refresh(req, res);
        } catch (error) {
            res.status(500).json({ error });
        }
    };
    handleThirdPartyAuthentication = (req, res, next) => {
        return (error, user, info) => {
            this._userService.handleThirdPartyAuthentication(
                error,
                user,
                info,
                req,
                res,
                next
            );
        };
    };
}

module.exports = new UserController();
