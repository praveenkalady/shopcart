import bcrypt from 'bcryptjs';
const users = [
    {
        name:'admin user',
        email:'admin@example.com',
        isAdmin:true,
        password:bcrypt.hashSync('123456',10)
    },
    {
        name:'John Doe',
        email:'john@example.com',
        password:bcrypt.hashSync('')
    },
    {
        name:'Jane',
        email:'jane@example.com',
        password:bcrypt.hashSync('123456',10)
    }
]

export default users;