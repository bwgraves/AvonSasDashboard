const belowThreshold = 9;
const aboveThreshold = 1001;

const bacteriaData = {
  Eckington: {
    labels: [
      '23/05/2025', '19/05/2025', '27/05/2025', '02/06/2025', '09/06/2025', '16/06/2025', '23/06/2025', '30/06/2025',
      '09/07/2025', '16/07/2025', '23/07/2025', '29/07/2025', '06/08/2025', '12/08/2025', '21/08/2025', '28/08/2025',
      '03/09/2025', '10/09/2025', '15/09/2025', '30/09/2025', '07/10/2025', '14/10/2025', '28/10/2025', '25/11/2025',
      '06/01/2026', '03/02/2026', '07/03/2026', '23/03/2026', '20/04/2026', '12/05/2026', '18/05/2026', '26/05/2026', '01/06/2026', '08/06/2026', '17/06/2026', '23/06/2026', '29/06/2026', '06/07/2026'
    ],
    ecoli: [150, 160, 9, 70, 20, 120, 70, 50, 120, 9, 20, 120, 9, 9, 30, 30, 50, 60, 90, 110, 260, 50, 30, 40, 1001, 170, 350, 190, 9, 40, 50, 80, 9, 80, 50, 60, 30, 10],
    coliforms: [600, 590, 9, 220, 170, 490, 900, 660, 380, 9, 1001, 720, 240, 120, 490, 710, 1001, 1001, 1001, 1001, 1001, 330, 490, 510, 1001, 620, 1001, 560, 9, 180, 230, 190, 9, 390, 530, 230, 600, 470],
    enterococci: [60, 30, 60, 220, 90, 210, 80, 70, 100, 9, 30, 9, 50, 40, 50, 9, 50, 100, 50, 620, 80, 9, 9, 9, 650, 210, 150, 120, 9, 9, 9, 9, 9, 140, 360, 50, 50, 70]
  },
  Fladbury: {
    labels: [
      '23/05/2025', '28/04/2025', '19/05/2025', '27/05/2025', '02/06/2025', '09/06/2025', '16/06/2025', '23/06/2025',
      '30/06/2025', '09/07/2025', '16/07/2025', '23/07/2025', '29/07/2025', '06/08/2025', '12/08/2025', '21/08/2025',
      '28/08/2025', '03/09/2025', '10/09/2025', '15/09/2025', '30/09/2025', '07/10/2025', '14/10/2025', '28/10/2025',
      '25/11/2025', '06/01/2026', '03/02/2026', '07/03/2026', '23/03/2026', '20/04/2026', '12/05/2026'
    ],
    ecoli: [210, 550, 400, 530, 210, 630, 1001, 260, 90, 50, 9, 200, 1001, 40, 220, 50, 80, 100, 350, 220, 1001, 580, 240, 320, 280, 1001, 1001, 1001, 600, 70, 1001],
    coliforms: [830, 1001, 1001, 1001, 810, 1001, 1001, 1001, 650, 680, 9, 1001, 1001, 930, 1001, 890, 820, 1001, 1001, 1001, 1001, 1001, 1001, 1001, 920, 1001, 1001, 1001, 1001, 520, 1001],
    enterococci: [80, 100, 30, 9, 9, 30, 170, 80, 20, 80, 60, 50, 820, 60, 30, 70, 9, 60, 120, 80, 1001, 50, 80, 50, 160, 800, 360, 460, 200, 90, 220]
  },
  Bidford: {
    labels: [
      '23/05/2025', '19/05/2025', '27/05/2025', '02/06/2025', '09/06/2025', '16/06/2025', '23/06/2025', '30/06/2025',
      '09/07/2025', '16/07/2025', '23/07/2025', '29/07/2025', '06/08/2025', '12/08/2025', '21/08/2025', '28/08/2025',
      '03/09/2025', '10/09/2025', '15/09/2025', '30/09/2025', '07/10/2025', '14/10/2025', '28/10/2025', '25/11/2025',
      '06/01/2026', '03/02/2026', '07/03/2026', '23/03/2026', '20/04/2026', '12/05/2026'
    ],
    ecoli: [40, 280, 40, 460, 50, 1001, 130, 70, 10, 1001, 80, 330, 120, 130, 50, 70, 100, 460, 260, 1001, 10, 190, 200, 110, 1001, 1001, 1001, 140, 80, 1001],
    coliforms: [470, 920, 270, 1310, 430, 1001, 680, 520, 260, 1001, 1001, 910, 510, 710, 1001, 610, 1001, 1001, 1001, 1001, 380, 590, 1001, 540, 1001, 1001, 1001, 860, 200, 1001],
    enterococci: [50, 9, 9, 80, 9, 390, 350, 30, 30, 9, 1001, 120, 120, 60, 160, 9, 60, 320, 160, 100, 50, 60, 110, 40, 1001, 270, 330, 100, 9, 220]
  }
};

function formatDisplayValue(value) {
  if (value === belowThreshold) return '<10';
  if (value === aboveThreshold) return '>1000';
  if (value == null) return '-';
  return value;
}

function escapeCsvValue(value) {
  const stringValue = String(value ?? '');
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function buildCsvRows(locationNames) {
  const rows = [['Location', 'Date', 'E-Coli', 'Enterococci', 'Coliforms']];

  locationNames.forEach((location) => {
    const locationData = bacteriaData[location];
    if (!locationData) return;

    locationData.labels.forEach((date, index) => {
      rows.push([
        location,
        date,
        formatDisplayValue(locationData.ecoli[index]),
        formatDisplayValue(locationData.enterococci[index]),
        formatDisplayValue(locationData.coliforms[index])
      ]);
    });
  });

  return rows;
}

function downloadCsv(rows, filename) {
  const csv = rows
    .map((row) => row.map((value) => escapeCsvValue(value)).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function setupExportModal() {
  const exportModal = document.getElementById('export-modal');
  const openExportModalButton = document.querySelector('[data-open-export-modal]');
  const exportConfirmButton = document.querySelector('[data-export-confirm]');
  const exportScopeInputs = document.querySelectorAll('input[name="export-scope"]');
  const exportLocationWrapper = document.querySelector('[data-export-location-wrapper]');
  const exportLocationSelect = document.getElementById('export-location');

  if (!exportModal || !openExportModalButton || !exportConfirmButton || !exportLocationSelect || !exportLocationWrapper) {
    return;
  }

  function selectedExportScope() {
    const selected = document.querySelector('input[name="export-scope"]:checked');
    return selected?.value || 'all';
  }

  function syncExportLocationVisibility() {
    const isSingleLocation = selectedExportScope() === 'single';
    exportLocationWrapper.hidden = !isSingleLocation;
  }

  openExportModalButton.addEventListener('click', () => {
    syncExportLocationVisibility();
    exportModal.showModal();
  });

  exportScopeInputs.forEach((input) => {
    input.addEventListener('change', syncExportLocationVisibility);
  });

  exportConfirmButton.addEventListener('click', () => {
    const scope = selectedExportScope();
    const dateString = new Date().toISOString().slice(0, 10);
    const isSingleLocation = scope === 'single';
    const selectedLocation = exportLocationSelect.value;

    const availableLocations = Array.from(exportLocationSelect.options).map(o => o.value);
    const locations = isSingleLocation ? [selectedLocation] : availableLocations;
    const rows = buildCsvRows(locations);
    const filename = isSingleLocation
      ? `avonvale-bacteria-${selectedLocation.toLowerCase()}-${dateString}.csv`
      : `avonvale-bacteria-all-locations-${dateString}.csv`;
    
    downloadCsv(rows, filename);
    exportModal.close();
  });

  exportModal.addEventListener('click', (event) => {
    const dialogDimensions = exportModal.getBoundingClientRect();
    const isInDialog =
      event.clientX >= dialogDimensions.left &&
      event.clientX <= dialogDimensions.right &&
      event.clientY >= dialogDimensions.top &&
      event.clientY <= dialogDimensions.bottom;

    if (!isInDialog) {
      exportModal.close();
    }
  });
}

function updateLatestDataTable() {
  const rows = document.querySelectorAll('table tbody tr');

  rows.forEach((row) => {
    const siteName = row.cells[0].textContent.trim();
    const siteData = bacteriaData[siteName];

    if (!siteData) {
      row.cells[1].textContent = '-';
      row.cells[2].textContent = '-';
      row.cells[3].textContent = '-';
      return;
    }

    const ec = siteData.ecoli[siteData.ecoli.length - 1];
    const co = siteData.coliforms[siteData.coliforms.length - 1];
    const ie = siteData.enterococci[siteData.enterococci.length - 1];

    row.cells[1].textContent = formatDisplayValue(ec);

    const ecClass =
      ec <= 500 ? 'excellent' :
      ec <= 900 ? 'sufficient' :
      ec <= 1000 ? 'good' :
      ec != null ? 'poor' :
      'unknown';

    row.cells[1].classList.add(`colour--${ecClass}-light`);

    row.cells[3].textContent = formatDisplayValue(co);

    row.cells[2].textContent = formatDisplayValue(ie);

    const ieClass =
      ie <= 200 ? 'excellent' :
      ie <= 330 ? 'sufficient' :
      ie <= 400 ? 'good' :
      ie != null ? 'poor' :
      'unknown';

    row.cells[2].classList.add(`colour--${ieClass}-light`);
  });
}

function renderCharts() {
  const chartConfigs = [
    {
      attr: 'data-ecoli',
      key: 'ecoli',
      label: 'E-Coli CFU/100ml',
      color: '#EE5D9F',
      thresholds: [500, 900, 1000]
    },
    {
      attr: 'data-coliforms',
      key: 'coliforms',
      label: 'Coliforms CFU/100ml',
      color: '#5B8DEF'
    },
    {
      attr: 'data-enterocci',
      key: 'enterococci',
      label: 'Enterococci CFU/100ml',
      color: '#6EDCB4',
      thresholds: [200, 330, 400]
    }
  ];

  chartConfigs.forEach(({ attr, key, label, color, thresholds }) => {
    document.querySelectorAll(`[${attr}]`).forEach((canvas) => {
      const location = canvas.getAttribute('data-location');
      const locationData = bacteriaData[location];
      if (!locationData) return;

      const annotations = thresholds?.map((value, i) => ({
        type: 'line',
        yMin: value,
        yMax: value,
        borderColor: ['#2ecc71', '#f1c40f', '#e67e22'][i],
        borderWidth: 2,
        borderDash: [6, 6],
        label: {
          content: ['Excellent', 'Good', 'Sufficient'][i],
          enabled: false,
          color: 'black'
        }
      })) || [];

      new Chart(canvas, {
        type: 'line',
        data: {
          labels: locationData.labels,
          datasets: [{
            label,
            data: locationData[key],
            borderWidth: 1,
            borderColor: color,
            backgroundColor: color,
            maxBarThickness: 100
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'CFU/100ml'
              }
            }
          },
          borderRadius: 4,
          plugins: {
            legend: {
              display: false
            },
            annotation: {
              annotations: Object.fromEntries(annotations.map((annotation, i) => [`line${i}`, annotation]))
            }
          }
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateLatestDataTable();
  setupExportModal();
  renderCharts();
});
