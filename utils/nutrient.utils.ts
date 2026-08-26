import { Configuration, Instance } from "@nutrient-sdk/viewer";

const disabledToolbarItems = ['print'];

export const setupNutrientInstance = (instance: Instance, setLocalStorage: React.Dispatch<React.SetStateAction<string | undefined>>) => {

    const toolbarItems = instance.toolbarItems;
    console.log(toolbarItems);
    instance.setToolbarItems(toolbarItems.filter((item) => !disabledToolbarItems.includes(item.type)));

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


export const setupNutrientConfig = (container: string | HTMLElement | Instance | null, documentUri: string, xfdf?: string) => {
    return {
        container,
        useCDN: true,
        document: documentUri,
        XFDF: xfdf,
        mentionableUsers: [
            { id: '1', name: 'Han Solo', displayName: 'NotChewie', description: 'han_solo@12parsecs.com' },
            { id: '2', name: 'Darth Vader', displayName: 'YourFather', description: 'darth.vader@empire.gov' }
        ]
    } as Configuration
}