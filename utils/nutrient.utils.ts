import { Instance } from "@nutrient-sdk/viewer";

const disabledItems = ['print'];

export const setupNutrientInstance = (instance: Instance, setLocalStorage: React.Dispatch<React.SetStateAction<string | undefined>>) => {

    const toolbarItems = instance.toolbarItems;
    console.log(toolbarItems);
    instance.setToolbarItems(toolbarItems.filter((item) => !disabledItems.includes(item.type)));

    instance.setAnnotationCreatorName("Luke Skywalker")
    instance.addEventListener("annotations.create", async createdAnnotations => {
        const exportedXfdf = await instance.exportXFDF();
        setLocalStorage(exportedXfdf);
    });
    instance.addEventListener("annotations.update", async updatedAnnotations => {
        const exportedXfdf = await instance.exportXFDF();
        setLocalStorage(exportedXfdf);
    });
    instance.addEventListener("annotations.delete", async deletedAnnotations => {
        const exportedXfdf = await instance.exportXFDF();
        setLocalStorage(exportedXfdf);
    });
    instance.addEventListener("comments.create", async createdComments => {
        const exportedXfdf = await instance.exportXFDF();
        setLocalStorage(exportedXfdf);
    });
    instance.addEventListener("comments.update", async updatedComments => {
        const exportedXfdf = await instance.exportXFDF();
        setLocalStorage(exportedXfdf);
    });
    instance.addEventListener("comments.delete", async deletedComments => {
        const exportedXfdf = await instance.exportXFDF();
        setLocalStorage(exportedXfdf);
    });
}