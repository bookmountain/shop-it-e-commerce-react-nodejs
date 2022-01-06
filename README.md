# ShopIt - the e-commerce website

### Use admin/user account to login.

```bash
account: admin@gmail.com
password: 11111111
# or
account: user@gmail.com
password: 11111111
```
or create your own account by register.

Forget password will send a verification email to your email address, click the url in email to reset your new password.

admin account is able to create a room, edit the orders, and have user management, review management system. 

Transaction platform is using Stripe, card information for testing in following 

```bash
card number: 4000 0027 6000 3184
# random expiry date, CVC and name
MM/YY: 01/30
CVC: 111
name: user

region: Taiwan
```

if payment is successful, order will be created in database.
