exports.getIndex = (req, res) => {
    res.json({
        success: true,
        data: {
            message: 'Hello! You are at the entry point of this api 😉',
        },
    });
};
