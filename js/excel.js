export async function getSelectedData() {
  return await Excel.run(async (context) => {
    const range = context.workbook.getSelectedRange();
    range.load("values");

    await context.sync();

    return range.values;
  });
}