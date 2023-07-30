const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

async function uploadFile() {
    try {
        const f = await openai.createFile(
            fs.createReadStream("mental_health_edit.jsonl"),
            "fine-tune"
        );
        console.log(`File ID ${f.data.id}`);
        return f.data.id;
    }
    catch (err) {
        console.log('err uploadfile: ', err);
    }
}
//uploadFile();
async function makeFineTune() {
    try {
        const ft = await openai.createFineTune({
            training_file: 'file-1bn1AKLMLn53zLUeEjg0yTUT',
            model: 'davinci'
        });
        console.log(ft.data);
    }
    catch (err) {
        console.log('err makefinetune: ', err.response.data.error);
    }
}
//makeFineTune();

async function getFineTunedModelName() {
    try {
        const modelName = await openai.listFineTunes();
        console.table(modelName.data.data, ["id", "status", "fine_tuned_model"]);

    }
    catch (err) {
        console.log('err getmod: ', err)
    }
}
//getFineTunedModelName();

async function run() {
    try {
        const comp = await openai.createCompletion({
            model: 'davinci:ft-personal-2023-05-17-05-52-51',
            prompt: `What causes mental illness? ->`, //replace this prompt according to your data
            max_tokens: 200
        });
        if (comp.data) {
            console.log('choices: ', comp.data.choices)
        }
    } catch (err) {
        console.log('err: ', err)
    }
}
run();
