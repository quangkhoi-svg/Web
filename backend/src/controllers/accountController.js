// src/controllers/accountController.js
import { accounts } from "../data/accounts.js";

export const getAccounts = (req, res) => {
  const { server, section } = req.query;
  let result = accounts;

  if (server) result = result.filter((acc) => acc.server === server);
  if (section) result = result.filter((acc) => acc.section === section);

  res.json(result);
};

export const getAccountById = (req, res) => {
  const account = accounts.find((a) => a.id === req.params.id);
  if (!account) return res.status(404).json({ message: "Account not found" });
  res.json(account);
};

export const createAccount = (req, res) => {
  const { game, server, section, title, rank, description, mainImage, images } =
    req.body;

  const newAccount = {
    id: Date.now().toString(),
    game: game || "GTA5VN",
    server,
    section: section || "character",
    title,
    rank,
    description,
    mainImage: mainImage || "",   // ⭐ Ảnh chính
    images: images || []          // ⭐ Ảnh phụ
  };

  accounts.push(newAccount);
  res.status(201).json(newAccount);
};

export const updateAccount = (req, res) => {
  const { id } = req.params;
  const { game, server, section, title, rank, description, mainImage, images } =
    req.body;

  const index = accounts.findIndex((a) => a.id === id);
  if (index === -1) return res.status(404).json({ message: "Account not found" });

  accounts[index] = {
    ...accounts[index],
    game: game ?? accounts[index].game,
    server: server ?? accounts[index].server,
    section: section ?? accounts[index].section,
    title: title ?? accounts[index].title,
    rank: rank ?? accounts[index].rank,
    description: description ?? accounts[index].description,
    mainImage: mainImage ?? accounts[index].mainImage,
    images: images ?? accounts[index].images
  };

  res.json(accounts[index]);
};

export const deleteAccount = (req, res) => {
  const { id } = req.params;
  const index = accounts.findIndex((a) => a.id === id);
  if (index === -1) return res.status(404).json({ message: "Account not found" });

  accounts.splice(index, 1);
  res.json({ message: "Account removed" });
};
