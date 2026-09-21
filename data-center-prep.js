(() => {
  const cards = [
    { category: 'Minimum to POST', q: 'What does POST stand for?', a: 'Power-On Self-Test.' },
    { category: 'Minimum to POST', q: 'What does minimum to POST mean?', a: 'Reduce the server to only the hardware required to complete POST so you can isolate the failing component.' },
    { category: 'Minimum to POST', q: 'What hardware is typically required for minimum to POST on a Dell PowerEdge?', a: 'The system board, CPU1, one DIMM in A1, PSU1, and the required default riser when the model needs it. Always confirm the exact list in that model\'s service manual.' },
    { category: 'Minimum to POST', q: 'What should you check first when a server will not POST?', a: 'Check the LCD or diagnostic LEDs and review iDRAC hardware and lifecycle logs for a specific fault.' },
    { category: 'Minimum to POST', q: 'What should you do before removing internal server components?', a: 'Shut the server down, disconnect power, follow ESD precautions, and drain residual power according to the service procedure.' },
    { category: 'Minimum to POST', q: 'What should you do if the server POSTs in its minimum configuration?', a: 'Add removed components back one at a time and retest until the failure returns.' },
    { category: 'Minimum to POST', q: 'What is a known-good swap?', a: 'Replace a suspected part with a confirmed working part, or test the suspect part in a known-good location, to see whether the fault follows the component.' },
    { category: 'Minimum to POST', q: 'What is the difference between no power, no POST, no boot, and no video?', a: 'No power means the server does not turn on. No POST means hardware initialization does not complete. No boot means POST completes but the operating system does not load. No video means the system may be running but has no display output.' },

    { category: 'PowerEdge Hardware', q: 'What is iDRAC?', a: 'The Integrated Dell Remote Access Controller, which provides out-of-band server management independent of the operating system.' },
    { category: 'PowerEdge Hardware', q: 'What can you do through iDRAC?', a: 'Review hardware health and logs, use a remote console, manage power, view alerts, update firmware, and configure hardware remotely.' },
    { category: 'PowerEdge Hardware', q: 'What is the Lifecycle Controller?', a: 'Dell\'s embedded environment for hardware configuration, diagnostics, deployment, firmware, and maintenance.' },
    { category: 'PowerEdge Hardware', q: 'Which key commonly opens Lifecycle Controller during PowerEdge startup?', a: 'F10.' },
    { category: 'PowerEdge Hardware', q: 'What is a DIMM?', a: 'A dual in-line memory module. In a minimum-to-POST test, a supported DIMM is commonly installed in the first slot assigned to CPU1, often A1.' },
    { category: 'PowerEdge Hardware', q: 'What does a PCIe riser do?', a: 'It changes the physical orientation and provides expansion slots for devices such as GPUs, NICs, HBAs, and RAID controllers.' },
    { category: 'PowerEdge Hardware', q: 'What does hot-swappable mean?', a: 'The component can be removed and replaced while the system remains powered, but only when the server and component are designed and configured for it.' },
    { category: 'PowerEdge Hardware', q: 'Why should firmware compatibility be checked before replacing server hardware?', a: 'The server BIOS, iDRAC, controller firmware, and component firmware must support the installed part and configuration.' },

    { category: 'RAID and PERC', q: 'What is PERC?', a: 'PowerEdge RAID Controller, Dell\'s hardware controller family for managing supported storage and RAID configurations.' },
    { category: 'RAID and PERC', q: 'What is RAID 0?', a: 'Striping for performance and capacity with no fault tolerance. One failed drive can make the array unavailable.' },
    { category: 'RAID and PERC', q: 'What is RAID 1?', a: 'Mirroring. The same data is written to two drives for redundancy.' },
    { category: 'RAID and PERC', q: 'What is RAID 5?', a: 'Striping with single distributed parity. It can tolerate one drive failure.' },
    { category: 'RAID and PERC', q: 'What is RAID 6?', a: 'Striping with dual distributed parity. It can tolerate two drive failures.' },
    { category: 'RAID and PERC', q: 'What is RAID 10?', a: 'Mirrored pairs combined with striping. It provides strong performance and redundancy but uses half the raw capacity.' },
    { category: 'RAID and PERC', q: 'A server completes POST but reports no boot device. Is that a no-POST problem?', a: 'No. That is a no-boot problem. Check the boot order, controller and virtual-disk status, drive health, and operating-system boot data.' },

    { category: 'NVIDIA GPU', q: 'Which Linux command displays NVIDIA GPU status?', a: '<code>nvidia-smi</code>' },
    { category: 'NVIDIA GPU', q: 'What information can nvidia-smi show?', a: 'GPU model, utilization, memory usage, temperature, power, driver version, and active GPU processes.' },
    { category: 'NVIDIA GPU', q: 'Which command confirms whether Linux detects a GPU on the PCIe bus?', a: '<code>lspci</code>' },
    { category: 'NVIDIA GPU', q: 'What should you check when a server does not detect a GPU?', a: 'Check iDRAC and PCIe logs, GPU seating, auxiliary power, the riser and slot, supported system configuration, firmware, thermals, Linux PCIe detection, and the NVIDIA driver.' },
    { category: 'NVIDIA GPU', q: 'How do you determine whether a missing GPU or its slot is faulty?', a: 'Test the GPU in a known-good supported slot and test a known-good GPU in the suspect slot, changing one variable at a time.' },
    { category: 'NVIDIA GPU', q: 'What are the main physical concerns for data-center GPUs?', a: 'Power delivery, airflow and cooling, correct seating, PCIe connectivity, supported risers and slots, and firmware compatibility.' },

    { category: 'Linux Commands', q: 'What does lspci show?', a: 'PCI and PCIe devices such as GPUs, NICs, storage controllers, and other adapters.' },
    { category: 'Linux Commands', q: 'What does lsblk show?', a: 'Block devices such as disks, partitions, and logical volumes.' },
    { category: 'Linux Commands', q: 'What does lscpu show?', a: 'CPU architecture, model, socket, core, thread, and virtualization information.' },
    { category: 'Linux Commands', q: 'What does free -h show?', a: 'Memory and swap usage in human-readable units.' },
    { category: 'Linux Commands', q: 'What does df -h show?', a: 'Mounted filesystem capacity and usage in human-readable units.' },
    { category: 'Linux Commands', q: 'What do ip addr and ip route show?', a: '<code>ip addr</code> shows interface addresses and states. <code>ip route</code> shows the routing table and default gateway.' },
    { category: 'Linux Commands', q: 'Why is dmesg useful for server troubleshooting?', a: 'It shows kernel messages about hardware detection, drivers, PCIe events, storage, memory, and other low-level issues.' },
    { category: 'Linux Commands', q: 'What does journalctl do?', a: 'It queries systemd journal logs for the system, boot, kernel, or a specific service.' },
    { category: 'Linux Commands', q: 'How do you check a Linux service?', a: '<code>systemctl status &lt;service&gt;</code>' },

    { category: 'Interview Scenarios', q: 'A PowerEdge powers on and its fans spin, but POST never completes. Walk through your response.', a: 'Check diagnostic indicators and iDRAC logs, remove external and third-party variables, shut down safely, drain power, reduce the server to the model-specific minimum-to-POST configuration, then isolate remaining parts with one-at-a-time tests and known-good swaps.' },
    { category: 'Interview Scenarios', q: 'The server POSTs after you remove all PCIe cards. What does that indicate?', a: 'A removed card, its power connection, the riser, the slot, or that PCIe path may be causing the failure. Reinstall and test one component at a time.' },
    { category: 'Interview Scenarios', q: 'The server POSTs with one DIMM but fails when another is installed. What could be wrong?', a: 'The added DIMM may be bad or unsupported, the population order may be wrong, the slot may be damaged, or the related CPU memory channel may have a fault.' },
    { category: 'Interview Scenarios', q: 'You replaced a GPU, but the same slot still does not detect it. What next?', a: 'Confirm compatibility and power, inspect logs, then cross-test the replacement GPU in a known-good slot and a known-good GPU in the suspect slot to isolate the GPU, riser, slot, or system board.' },
    { category: 'Interview Scenarios', q: 'What troubleshooting method should guide a server break-fix case?', a: 'Observe the symptoms, identify the failure stage, review evidence, reduce variables, test one change at a time, use known-good swaps, confirm the root cause, and restore the system.' },
    { category: 'Interview Scenarios', q: 'How should you answer when you do not know the exact minimum-to-POST list for a model?', a: 'Explain the isolation process, state the common components, and say you would verify the exact model-specific configuration in Dell\'s service manual before removing parts.' }
  ];

  let filtered = cards.slice();
  let index = 0;
  let revealed = false;

  function render() {
    const card = filtered[index];
    document.getElementById('dcCardCategory').textContent = card.category;
    document.getElementById('dcQuestion').textContent = card.q;
    document.getElementById('dcAnswer').innerHTML = card.a;
    document.getElementById('dcAnswer').classList.toggle('hidden', !revealed);
    document.getElementById('dcRevealBtn').textContent = revealed ? 'Hide answer' : 'Reveal answer';
    document.getElementById('dcCounter').textContent = `Card ${index + 1} of ${filtered.length}`;
    document.getElementById('dcPrevBtn').disabled = filtered.length < 2;
    document.getElementById('dcNextBtn').disabled = filtered.length < 2;
  }

  function move(amount) {
    index = (index + amount + filtered.length) % filtered.length;
    revealed = false;
    render();
  }

  function shuffleCards() {
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
    index = 0;
    revealed = false;
    render();
  }

  function init() {
    const setup = document.getElementById('setup');
    if (!setup || document.getElementById('dataCenterPrep')) return;

    const categories = [...new Set(cards.map(card => card.category))];
    const section = document.createElement('div');
    section.id = 'dataCenterPrep';
    section.className = 'backup dcprep';
    section.innerHTML = `
      <div class="dcprephead">
        <div>
          <h2>Data Center &amp; Server Hardware</h2>
          <div class="muted">Dell PowerEdge interview prep, NVIDIA GPU troubleshooting, and Linux commands.</div>
        </div>
        <span id="dcCounter" class="pill"></span>
      </div>
      <div class="dcfilter">
        <label class="small" for="dcCategory">Flashcard category</label>
        <select id="dcCategory">
          <option value="all">All topics</option>
          ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
        </select>
      </div>
      <div class="dccard" aria-live="polite">
        <div id="dcCardCategory" class="dckicker"></div>
        <div id="dcQuestion" class="dcquestion"></div>
        <div id="dcAnswer" class="dcanswer hidden"></div>
      </div>
      <div class="actions dcactions">
        <button class="secondary" id="dcPrevBtn">Previous</button>
        <button id="dcRevealBtn">Reveal answer</button>
        <button class="secondary" id="dcNextBtn">Next</button>
        <button class="secondary" id="dcShuffleBtn">Shuffle</button>
      </div>`;
    setup.appendChild(section);

    const style = document.createElement('style');
    style.id = 'dataCenterPrepStyles';
    style.textContent = `.dcprep{margin-top:20px}.dcprephead{display:flex;justify-content:space-between;align-items:flex-start;gap:14px}.dcprephead h2{margin:0 0 4px}.dcfilter{max-width:320px;margin:18px 0 12px}.dccard{min-height:210px;background:linear-gradient(180deg,#182742,#121d31);border:1px solid #365b91;border-radius:16px;padding:20px;display:flex;flex-direction:column;justify-content:center}.dckicker{color:var(--accent);font-size:.75rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px}.dcquestion{font-size:clamp(1.15rem,2.8vw,1.5rem);font-weight:800}.dcanswer{margin-top:16px;padding-top:16px;border-top:1px solid var(--border);color:#dbe8ff}.dcanswer code{background:#08101e;border:1px solid var(--border);border-radius:6px;padding:2px 6px}.dcactions button{min-width:120px}@media(max-width:600px){.dcprephead{display:block}.dcprephead .pill{display:inline-block;margin-top:10px}.dccard{min-height:235px}.dcactions button{min-width:calc(50% - 5px)}}`;
    document.head.appendChild(style);

    document.getElementById('dcCategory').addEventListener('change', event => {
      filtered = event.target.value === 'all' ? cards.slice() : cards.filter(card => card.category === event.target.value);
      index = 0;
      revealed = false;
      render();
    });
    document.getElementById('dcRevealBtn').addEventListener('click', () => { revealed = !revealed; render(); });
    document.getElementById('dcPrevBtn').addEventListener('click', () => move(-1));
    document.getElementById('dcNextBtn').addEventListener('click', () => move(1));
    document.getElementById('dcShuffleBtn').addEventListener('click', shuffleCards);
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
