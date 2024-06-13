// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  try {
    const vaultData = await vault(id);
    const centralData = await central(id);
    const dbData = await dbs[centralData](id);

    let myObj = { id: id, ...vaultData, ...dbData };

    return myObj;
  } catch (error) {
    console.log(error);
  }
}

getUserData(4).then((value) => console.log(value));
