export const homeController = async (req, res) => {
    res.status(200).type("text/plain").send("Hello, World!");
};

export const postHomeController = async (req, res) => {
    res.status(201).json(req.body);
};