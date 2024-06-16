/*
 * Table Block
 * Recreate a table
 * https://www.hlx.live/developer/block-collection/table
 */

function buildCell(isHeader) {
  const cell = isHeader ? document.createElement('th') : document.createElement('td');
  if (isHeader) cell.setAttribute('scope', 'col');
  return cell;
}

export default async function decorate(block) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const header = !block.classList.contains('no-header');
  if (header) {
    table.append(thead);
  }
  table.append(tbody);

  const link = block.querySelector('a[href$=".json"]');
  const resp = await fetch(`${link}?limit=20&offset=20`, {});
  const json = await resp.json();
  const headerRow = document.createElement('tr');
  json.data.forEach((entry, i) => {
    const tableRow = document.createElement('tr');
    if (header && i === 0) {
      thead.append(headerRow);
    }
    tbody.append(tableRow);
    Object.entries(entry).forEach(([key, value]) => {
      if (header && i === 0) {
        const headerCell = buildCell(true);
        headerCell.innerHTML = key;
        headerRow.appendChild(headerCell);
      }
      const cell = buildCell(false);
      cell.innerHTML = value;
      tableRow.append(cell);
    });
  });
  block.innerHTML = '';
  block.append(table);
}
