// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  const myObj = { id: id };
  try {
    const vaultData = await vault(id);
    const centralData = await central(id);
    const dbData = await dbs[centralData](id);
    Promise.all([vaultData, dbData]).then((value) => {
      value.forEach((element) => {
        for (const key in element) {
          myObj[key] = element[key];
        }
      });
    });
  } catch (error) {
    console.log(error);
  }

  return myObj;
}

getUserData(4).then((value) => console.log(value));
