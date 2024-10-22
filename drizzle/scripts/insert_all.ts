import { InsertLevels } from "./levels/insertLevels";
import { InsertN5Grammars } from "./grammars/insertGrammars";
import { InsertN5GrammarExamples } from "./grammarExamples/insertGrammarExamples";
const seed = async () => {
  try {
    await InsertLevels();
    await InsertN5Grammars();
    await InsertN5GrammarExamples();   
    console.log("Đã chèn dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi khi chèn dữ liệu:", error);
  }
};

seed();
