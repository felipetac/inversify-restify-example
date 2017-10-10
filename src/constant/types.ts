const TYPES = {
    Database: Symbol('Database'),
    Log: Symbol('Log'),
    Server: Symbol('Server'),
    ServerRestify: Symbol('ServerRestify'),
    UserForm: Symbol('UserForm'),
    UserModel: Symbol('UserModel'),
    UserModelProvider: () => Promise,
    UserService: Symbol('UserService')
};

export default TYPES;
