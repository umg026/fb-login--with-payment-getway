import MySql from "../config/db.js";
import { STATUS } from "../constants/statusCode.js"

const addPlan = async (req, res) => {
   try {
      const { name, stripe_price_id, tiral_days, have_trial, amount, type } = req.body;

      if (!name || !stripe_price_id || !tiral_days && tiral_days !== 0 || have_trial === undefined || !amount && amount !== 0 || !type && type !== 0) {
         return res.status(STATUS.BAD_REQUEST).json({
            success: false,
            msg: "All field are required!!"
         })
      }

      const [data] = await MySql.query(`INSERT INTO subcription_plan 
      (name, stripe_price_id, tiral_days, have_trial, amount, type)
      VALUES (?,?,?,?,?,?)`, [name, stripe_price_id, tiral_days, have_trial, amount, type])

      if (!data) {
         return res.status(STATUS.NOT_FOUND).json({
            success: false,
            msg: "Someting went wrong!"
         })
      }

      return res.status(STATUS.SUCCESS).json({
         success: true,
         msg: "Plan created Successfully!",
         data
      })

   }
   catch (error) {
      console.log("error", error);

      return res
         .status(STATUS.SERVER_ERROR)
         .json({
            success: false,
            msg: "Internal server error",
            error
         })
   }
}

const getPlans = async (req, res) => {
   try {
      const [data] = await MySql.query("SELECT * FROM subcription_plan");
      if (!data) {
         return res.status(STATUS.BAD_REQUEST).json({
            success: false,
            msg: "Something went wrong!"
         })
      }
      return res.status(STATUS.SUCCESS).json({
         success: true,
         msg: "Plan get successfully!",
         data
      })
   }
   catch (error) {
      return res.status(STATUS.SERVER_ERROR).json({
         success: false,
         msg: "Internal server error!"
      })
   }
}

const planDetails = async (req, res) => {
   try {
      const { plan_id } = req.body;
      if (!plan_id) {
         return res.status(STATUS.BAD_REQUEST).json({
            success: false,
            msg: "Please provide plan id!"
         })
      }
      const [plan] = await MySql.query(`SELECT * FROM subcription_plan WHERE id=?`, [plan_id]);

      if (!plan) {
         return res.status(STATUS.BAD_REQUEST).json({
            success: false,
            msg: "Plan doesn't exist!"
         })
      }

      


   }
   catch (error) {

   }
}
export {
   addPlan,
   getPlans,
   planDetails
}