import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// Get all
router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId
    },
  });
  res.json(todos);
});

// Create
router.post("/", async (req, res) => {
  const { task } = req.body;
  try {
    // const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
    //     VALUES (?, ?)`);
    // console.log(req.userId);
    // const result = insertTodo.run(req.userId, task);
const todo =  await prisma.todo.create({
  data: {
    task,
    userId: req.userId
  }
})

    res.json(todo);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// Update
router.put("/:id",async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;

  const updatedTodo = await prisma.todo.update({
    where: {
      id: parseInt(id),
      userId: req.userId
    },
    data: {
      completed: !!completed
    }
  })

  res.json(updatedTodo);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const deleteTodo = await prisma.todo.delete({
    where:{
      id: parseInt(id),
      userId
    }
  })

  res.json({ message: "Todo deleted" });
});

export default router;
