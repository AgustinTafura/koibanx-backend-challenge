const { check, validationResult } = require('express-validator');

const storeInputs = [
    check('name')
        .exists().withMessage('parameter required')
        .isLength({ min: 3 }).withMessage('Must contain atleast 3 Characters'),
    check('cuit')
        .exists().withMessage('parameter required')
        .isNumeric().withMessage('Must contain only numbers')
        .isLength({ min: 11 }).withMessage('Must contain 11 Characters'),
    check('concepts')
        .isArray().withMessage('Must be an Array')
        .exists().withMessage('parameter required'),
    check('currentBalance')
        .isNumeric().withMessage('Must contain only numbers')
        .exists().withMessage('parameter required'),
    check('active')
        .exists().withMessage('parameter required')
        .isBoolean(),
    check('lastSale')
        .exists().withMessage('parameter required')
        .isISO8601().withMessage("only ISO 8601 date is valid"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
  storeInputs
};