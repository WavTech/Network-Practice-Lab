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

  const testQuestions = [
    { q: 'What does POST stand for?', options: ['Power-On Self-Test', 'Primary Operating System Test', 'Power Output System Tool', 'Processor Operational Status Test'], answer: 'Power-On Self-Test' },
    { q: 'What is the purpose of reducing a server to minimum-to-POST configuration?', options: ['Increase operating-system performance', 'Isolate the hardware causing the POST failure', 'Rebuild the RAID array', 'Update every device driver'], answer: 'Isolate the hardware causing the POST failure' },
    { q: 'Which set most closely represents a typical Dell PowerEdge minimum-to-POST configuration?', options: ['System board, CPU1, one DIMM in A1, PSU1, and the required riser', 'Both CPUs, all DIMMs, all drives, and both PSUs', 'System board, every PCIe card, and all storage drives', 'CPU2, one drive, and a GPU'], answer: 'System board, CPU1, one DIMM in A1, PSU1, and the required riser' },
    { q: 'What should you check first when a PowerEdge powers on but does not complete POST?', options: ['The operating-system event viewer', 'Diagnostic indicators and iDRAC hardware logs', 'The switch VLAN configuration', 'The application database'], answer: 'Diagnostic indicators and iDRAC hardware logs' },
    { q: 'What is iDRAC primarily used for?', options: ['Out-of-band server management', 'Configuring switch trunks', 'Managing Microsoft 365 licenses', 'Creating Linux user accounts'], answer: 'Out-of-band server management' },
    { q: 'Which key commonly opens the Dell Lifecycle Controller during startup?', options: ['F2', 'F8', 'F10', 'F12'], answer: 'F10' },
    { q: 'What does PERC stand for?', options: ['PowerEdge RAID Controller', 'Primary Enterprise Routing Card', 'Power and Energy Regulation Circuit', 'PCIe Expansion Riser Controller'], answer: 'PowerEdge RAID Controller' },
    { q: 'Which RAID level provides striping with no fault tolerance?', options: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 10'], answer: 'RAID 0' },
    { q: 'Which RAID level can tolerate one drive failure using distributed parity?', options: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6'], answer: 'RAID 5' },
    { q: 'Which RAID level uses dual parity and can tolerate two drive failures?', options: ['RAID 0', 'RAID 5', 'RAID 6', 'RAID 10'], answer: 'RAID 6' },
    { q: 'A server completes POST but displays "No boot device found." What type of problem is this?', options: ['No power', 'No POST', 'No boot', 'No video'], answer: 'No boot' },
    { q: 'Which Linux command displays NVIDIA GPU status, temperature, memory use, and driver information?', options: ['lspci', 'nvidia-smi', 'lsblk', 'journalctl'], answer: 'nvidia-smi' },
    { q: 'Which Linux command confirms whether a GPU is visible on the PCIe bus?', options: ['lspci', 'free -h', 'ip route', 'df -h'], answer: 'lspci' },
    { q: 'Which Linux command is especially useful for reviewing kernel hardware and driver messages?', options: ['lsblk', 'dmesg', 'pwd', 'whoami'], answer: 'dmesg' },
    { q: 'Which command lists disks, partitions, and other block devices?', options: ['lsblk', 'lscpu', 'ip addr', 'nvidia-smi'], answer: 'lsblk' },
    { q: 'Which command shows memory and swap usage in human-readable units?', options: ['df -h', 'free -h', 'ip route', 'lspci'], answer: 'free -h' },
    { q: 'Which command shows the Linux routing table and default gateway?', options: ['ip addr', 'ip route', 'lsblk', 'systemctl status'], answer: 'ip route' },
    { q: 'How should you check the status of a Linux service?', options: ['systemctl status <service>', 'lspci <service>', 'free -h <service>', 'ip route <service>'], answer: 'systemctl status <service>' },
    { q: 'What should you do after a server successfully POSTs in its minimum configuration?', options: ['Replace the system board immediately', 'Add removed components back one at a time and retest', 'Reinstall Linux before adding hardware', 'Install every component at once'], answer: 'Add removed components back one at a time and retest' },
    { q: 'What is a known-good swap?', options: ['Testing with a confirmed working component to see whether the fault follows the part', 'Replacing every component in the server', 'Moving the server to a different rack', 'Resetting all firmware to factory defaults'], answer: 'Testing with a confirmed working component to see whether the fault follows the part' },
    { q: 'A server POSTs with one DIMM but fails after another DIMM is installed. What is the best next step?', options: ['Assume the operating system is corrupt', 'Check the added DIMM, slot, population order, and related CPU memory channel', 'Replace all storage drives', 'Reconfigure the network switch'], answer: 'Check the added DIMM, slot, population order, and related CPU memory channel' },
    { q: 'A replacement GPU is still not detected in the same slot. What should you do next?', options: ['Cross-test the GPU and slot with known-good hardware', 'Reinstall the operating system immediately', 'Replace all server memory', 'Change the server hostname'], answer: 'Cross-test the GPU and slot with known-good hardware' },
    { q: 'What does a PCIe riser provide in a rack server?', options: ['Expansion slots for devices such as GPUs and NICs', 'Additional storage capacity', 'A backup operating system', 'Remote user authentication'], answer: 'Expansion slots for devices such as GPUs and NICs' },
    { q: 'What does hot-swappable mean?', options: ['A supported component can be replaced while the system remains powered', 'A component can be installed in any server model', 'A component never requires firmware', 'A component automatically repairs itself'], answer: 'A supported component can be replaced while the system remains powered' },
    { q: 'Why should hardware and firmware compatibility be confirmed before installing a replacement part?', options: ['The BIOS, iDRAC, controller, and server platform must support the part', 'It increases the network subnet size', 'It changes the Linux root password', 'It prevents users from accessing iDRAC'], answer: 'The BIOS, iDRAC, controller, and server platform must support the part' }
  ];
  testQuestions.forEach((question, questionIndex) => { question.id = `dc-${String(questionIndex + 1).padStart(3, '0')}`; });

  let filtered = cards.slice();
  let index = 0;
  let revealed = false;
  let testSession = [];
  let testIndex = 0;
  let testCorrect = 0;
  let testAnswered = false;

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

  function shuffled(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function dataCenterProgress() {
    const saved = typeof getSaved === 'function' ? getSaved() : null;
    return saved?.dataCenter || {
      seen: {},
      missed: {},
      stats: { attempts: 0, correct: 0 },
      perQuestion: {},
      sessions: []
    };
  }

  function renderDataCenterProgress() {
    const target = document.getElementById('dcTracking');
    if (!target) return;
    const progress = dataCenterProgress();
    const completed = Object.keys(progress.seen || {}).length;
    const attempts = progress.stats?.attempts || 0;
    const correct = progress.stats?.correct || 0;
    const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
    const missed = Object.keys(progress.missed || {}).length;
    const latest = progress.sessions?.[0];
    target.innerHTML = `
      <div class="dctracktitle">Your Data Center Progress</div>
      <div class="dctrackgrid">
        <div class="dctrackstat"><strong>${completed}<span>/${testQuestions.length}</span></strong><small>Questions completed</small></div>
        <div class="dctrackstat"><strong>${attempts}</strong><small>Answers submitted</small></div>
        <div class="dctrackstat"><strong>${accuracy}%</strong><small>Accuracy</small></div>
        <div class="dctrackstat"><strong>${missed}</strong><small>Missed pool</small></div>
      </div>
      ${latest ? `<div class="dctracklatest">Last test: <strong>${latest.correct}/${latest.total} (${latest.percent}%)</strong> · ${new Date(latest.date).toLocaleString()}</div>` : '<div class="dctracklatest">No completed data-center tests yet.</div>'}`;
    const missedButton = document.getElementById('dcMissedTestBtn');
    if (missedButton) missedButton.disabled = missed === 0;
  }

  function startTest(missedOnly = false) {
    const progress = dataCenterProgress();
    const source = missedOnly ? testQuestions.filter(question => progress.missed?.[question.id]) : testQuestions;
    if (!source.length) {
      alert('Your Data Center missed pool is empty.');
      return;
    }
    testSession = shuffled(source).slice(0, Math.min(20, source.length)).map(question => ({
      ...question,
      options: shuffled(question.options)
    }));
    testIndex = 0;
    testCorrect = 0;
    testAnswered = false;
    document.getElementById('dcTestIntro').classList.add('hidden');
    document.getElementById('dcTestResults').classList.add('hidden');
    document.getElementById('dcTestQuestionWrap').classList.remove('hidden');
    renderTestQuestion();
  }

  function renderTestQuestion() {
    const question = testSession[testIndex];
    testAnswered = false;
    document.getElementById('dcTestProgress').textContent = `Question ${testIndex + 1} of ${testSession.length}`;
    document.getElementById('dcTestScore').textContent = `Score ${testCorrect}/${testIndex}`;
    document.getElementById('dcTestQuestion').textContent = question.q;
    document.getElementById('dcTestOptions').innerHTML = question.options.map((option, optionIndex) => `
      <label class="dctestoption">
        <input type="radio" name="dcTestAnswer" value="${optionIndex}">
        <span class="letter">${String.fromCharCode(65 + optionIndex)}.</span>
        <span>${option.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
      </label>`).join('');
    const feedback = document.getElementById('dcTestFeedback');
    feedback.className = 'feedback hidden';
    feedback.textContent = '';
    document.getElementById('dcTestSubmitBtn').classList.remove('hidden');
    document.getElementById('dcTestNextBtn').classList.add('hidden');
  }

  function submitTestAnswer() {
    if (testAnswered) return;
    const selected = document.querySelector('input[name="dcTestAnswer"]:checked');
    if (!selected) {
      alert('Choose an answer first.');
      return;
    }
    const question = testSession[testIndex];
    const selectedText = question.options[Number(selected.value)];
    const correct = selectedText === question.answer;
    testAnswered = true;
    if (correct) testCorrect++;

    if (typeof getSaved === 'function' && typeof putSaved === 'function') {
      const saved = getSaved();
      const progress = saved.dataCenter;
      progress.seen[question.id] = (progress.seen[question.id] || 0) + 1;
      if (correct) delete progress.missed[question.id];
      else progress.missed[question.id] = true;
      progress.stats.attempts = (progress.stats.attempts || 0) + 1;
      if (correct) progress.stats.correct = (progress.stats.correct || 0) + 1;
      const perQuestion = progress.perQuestion[question.id] || { attempts: 0, correct: 0 };
      perQuestion.attempts++;
      if (correct) perQuestion.correct++;
      perQuestion.lastAnswered = new Date().toISOString();
      progress.perQuestion[question.id] = perQuestion;
      saved.updatedAt = new Date().toISOString();
      putSaved(saved);
    }

    document.querySelectorAll('.dctestoption').forEach(option => {
      const input = option.querySelector('input');
      input.disabled = true;
      const optionText = question.options[Number(input.value)];
      if (optionText === question.answer) option.classList.add('correct');
      if (input.checked && optionText !== question.answer) option.classList.add('wrong');
    });

    const feedback = document.getElementById('dcTestFeedback');
    feedback.className = `feedback ${correct ? 'good' : 'bad'}`;
    feedback.textContent = correct ? 'Correct' : `Incorrect. Correct answer: ${question.answer}`;
    document.getElementById('dcTestScore').textContent = `Score ${testCorrect}/${testIndex + 1}`;
    document.getElementById('dcTestSubmitBtn').classList.add('hidden');
    document.getElementById('dcTestNextBtn').classList.remove('hidden');
    document.getElementById('dcTestNextBtn').textContent = testIndex === testSession.length - 1 ? 'View results' : 'Next question';
  }

  function nextTestQuestion() {
    if (!testAnswered) return;
    testIndex++;
    if (testIndex >= testSession.length) {
      finishTest();
      return;
    }
    renderTestQuestion();
  }

  function finishTest() {
    document.getElementById('dcTestQuestionWrap').classList.add('hidden');
    const results = document.getElementById('dcTestResults');
    const percent = Math.round((testCorrect / testSession.length) * 100);
    if (typeof getSaved === 'function' && typeof putSaved === 'function') {
      const saved = getSaved();
      saved.dataCenter.sessions.unshift({
        date: new Date().toISOString(),
        total: testSession.length,
        correct: testCorrect,
        percent
      });
      saved.dataCenter.sessions = saved.dataCenter.sessions.slice(0, 100);
      saved.updatedAt = new Date().toISOString();
      putSaved(saved);
    }
    const message = percent >= 85 ? 'Interview ready. Keep drilling the troubleshooting sequence.' : percent >= 70 ? 'Solid foundation. Review the cards you hesitated on.' : 'Review the flashcards and retake the test.';
    results.innerHTML = `
      <h4>Test complete</h4>
      <div class="dctestresultscore">${testCorrect} / ${testSession.length} (${percent}%)</div>
      <p class="muted">${message}</p>
      <button id="dcRetakeTestBtn">Retake test</button>`;
    results.classList.remove('hidden');
    document.getElementById('dcRetakeTestBtn').addEventListener('click', () => startTest(false));
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
      </div>
      <div id="dcPracticeTest" class="dctest">
        <div id="dcTestIntro">
          <h3>Data Center Practice Test</h3>
          <p class="muted">20 randomized questions covering PowerEdge minimum to POST, RAID, NVIDIA GPUs, Linux commands, and break-fix scenarios.</p>
          <div id="dcTracking"></div>
          <div class="actions dcteststartactions">
            <button id="dcStartTestBtn">Start test</button>
            <button class="secondary" id="dcMissedTestBtn">Practice missed questions</button>
          </div>
        </div>
        <div id="dcTestQuestionWrap" class="hidden">
          <div class="topbar">
            <span id="dcTestProgress" class="pill"></span>
            <span id="dcTestScore" class="pill"></span>
          </div>
          <div id="dcTestQuestion" class="dctestquestion"></div>
          <div id="dcTestOptions"></div>
          <div id="dcTestFeedback" class="feedback hidden"></div>
          <div class="actions">
            <button id="dcTestSubmitBtn">Submit answer</button>
            <button id="dcTestNextBtn" class="hidden">Next question</button>
          </div>
        </div>
        <div id="dcTestResults" class="hidden"></div>
      </div>`;
    setup.appendChild(section);

    const style = document.createElement('style');
    style.id = 'dataCenterPrepStyles';
    style.textContent = `.dcprep{margin-top:20px}.dcprephead{display:flex;justify-content:space-between;align-items:flex-start;gap:14px}.dcprephead h2{margin:0 0 4px}.dcfilter{max-width:320px;margin:18px 0 12px}.dccard{min-height:210px;background:linear-gradient(180deg,#fff3e7,#ffffff);border:1px solid #e3a266;border-radius:16px;padding:20px;display:flex;flex-direction:column;justify-content:center}.dckicker{color:var(--accent-ink);font-size:.75rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px}.dcquestion{font-size:clamp(1.15rem,2.8vw,1.5rem);font-weight:800}.dcanswer{margin-top:16px;padding-top:16px;border-top:1px solid var(--border);color:#242424}.dcanswer code{background:#f2f2ef;border:1px solid var(--border);border-radius:6px;padding:2px 6px}.dcactions button{min-width:120px}.dctest{margin-top:28px;padding-top:24px;border-top:1px solid var(--border)}.dctest h3,.dctest h4{margin:0 0 8px}.dctestquestion{font-size:clamp(1.1rem,2.6vw,1.4rem);font-weight:800;margin:20px 0 14px}.dctestoption{display:flex;gap:12px;align-items:flex-start;background:var(--panel2);border:1px solid var(--border);border-radius:13px;padding:13px 14px;margin:10px 0;cursor:pointer}.dctestoption:hover{border-color:var(--accent-ink)}.dctestoption input{margin-top:5px;transform:scale(1.2)}.dctestoption.correct{border-color:var(--good);background:#e8f5ec}.dctestoption.wrong{border-color:var(--bad);background:#fff0ee}.dctestresultscore{font-size:1.8rem;font-weight:900;margin:10px 0}.dctracktitle{font-size:.78rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-ink);margin:18px 0 8px}.dctrackgrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.dctrackstat{background:var(--panel2);border:1px solid var(--border);border-radius:12px;padding:11px}.dctrackstat strong{display:block;font-size:1.3rem}.dctrackstat strong span{font-size:.75rem;color:var(--muted)}.dctrackstat small{display:block;color:var(--muted);font-size:.7rem}.dctracklatest{color:var(--muted);font-size:.78rem;margin-top:9px}.dcteststartactions{margin-top:12px}@media(max-width:600px){.dcprephead{display:block}.dcprephead .pill{display:inline-block;margin-top:10px}.dccard{min-height:235px}.dcactions button{min-width:calc(50% - 5px)}.dctrackgrid{grid-template-columns:repeat(2,minmax(0,1fr))}}`;
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
    document.getElementById('dcStartTestBtn').addEventListener('click', () => startTest(false));
    document.getElementById('dcMissedTestBtn').addEventListener('click', () => startTest(true));
    document.getElementById('dcTestSubmitBtn').addEventListener('click', submitTestAnswer);
    document.getElementById('dcTestNextBtn').addEventListener('click', nextTestQuestion);
    if (typeof window.putSaved === 'function' && !window.putSaved.__dataCenterWrapped) {
      const originalPutSaved = window.putSaved;
      const wrappedPutSaved = function(saved) {
        const result = originalPutSaved(saved);
        setTimeout(renderDataCenterProgress, 0);
        return result;
      };
      wrappedPutSaved.__dataCenterWrapped = true;
      window.putSaved = wrappedPutSaved;
    }
    renderDataCenterProgress();
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
