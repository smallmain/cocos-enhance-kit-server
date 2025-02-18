"use server";

import { randomUUID } from "crypto";
import { createStorage, prefixStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs-lite";
import { Icon } from "./components/icon";

const db = createStorage({
    driver: fsDriver({ base: "./db" }),
});

export interface Project {
    id: string;
    name: string;
    logo: Icon;
}

const projectsDb = prefixStorage<Project>(db as any, "projects");

// 初始化数据库
if ((await projectsDb.keys()).length === 0) {
    await addProject("示例项目");
}

export async function getProjects() {
    return (await projectsDb.getItems(await projectsDb.keys())).map(
        v => v.value,
    );
}

export async function addProject(name: string) {
    const id = randomUUID();
    const data: Project = {
        id,
        name,
        logo: Icon.Package,
    };
    await projectsDb.setItem(id, {
        id,
        name,
        logo: Icon.Package,
    });
    return data;
}

export async function removeProject(id: string) {
    await projectsDb.removeItem(id);
}
