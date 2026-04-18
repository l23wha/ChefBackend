 const {createChef, getAllChef, getById, UpdateChef, deleteChefById, deleteAllChef}=require("../Controller/Chef.controller")
const router=require("express").Router();

router.post("/createChef",createChef);
router.get("/get",getAllChef);

router.get("/get/:id",getById);
router.put("/update/:id",UpdateChef);
router.delete("/delete/:id",deleteChefById);
router.delete("/delete",deleteAllChef);

module.exports=router;