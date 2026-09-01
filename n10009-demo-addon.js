(() => {
  // Additional N10-009 questions imported from the supplied demo PDF.
  // Exact/near-exact question duplicates are skipped at load time so the main bank
  // does not present the same question twice.
  const incoming = [
    {
      question: 'A client wants to increase overall security after a recent breach. Which of the following would be best to implement? (Select two.)',
      options: [
        {letter:'A',text:'Least privilege network access'},
        {letter:'B',text:'Dynamic inventories'},
        {letter:'C',text:'Central policy management'},
        {letter:'D',text:'Zero-touch provisioning'},
        {letter:'E',text:'Configuration drift prevention'},
        {letter:'F',text:'Subnet range limits'}
      ],
      answer:['A','C'], sourceNumber:'Demo-1', page:'N10-009 Demo p.2', needs_visual:false
    },
    {
      question: 'A network administrator needs to connect two routers in a point-to-point configuration and conserve IP space. Which of the following subnets should the administrator use?',
      options: [
        {letter:'A',text:'/24'},
        {letter:'B',text:'/26'},
        {letter:'C',text:'/28'},
        {letter:'D',text:'/30'}
      ],
      answer:['D'], sourceNumber:'Demo-2', page:'N10-009 Demo p.3', needs_visual:false
    },
    {
      question: 'A network administrator determines that some switch ports have more errors present than expected. The administrator traces the cabling associated with these ports. Which of the following would most likely be causing the errors?',
      options: [
        {letter:'A',text:'arp'},
        {letter:'B',text:'tracert'},
        {letter:'C',text:'nmap'},
        {letter:'D',text:'ipconfig'}
      ],
      answer:['D'], sourceNumber:'Demo-3', page:'N10-009 Demo pp.3-4', needs_visual:false,
      source_warning:'Imported exactly from supplied demo. The source question/options appear internally inconsistent; retained without silently rewriting the supplied material.'
    },
    {
      question: 'A user notifies a network administrator about losing access to a remote file server. The network administrator is able to ping the server and verifies the current firewall rules do not block access to the network fileshare. Which of the following tools would help identify which ports are open on the remote file server?',
      options: [
        {letter:'A',text:'Dig'},
        {letter:'B',text:'Nmap'},
        {letter:'C',text:'Tracert'},
        {letter:'D',text:'nslookup'}
      ],
      answer:['B'], sourceNumber:'Demo-4', page:'N10-009 Demo p.4', needs_visual:false
    },
    {
      question: 'Which of the following allows for the interception of traffic between the source and destination?',
      options: [
        {letter:'A',text:'Self-signed certificate'},
        {letter:'B',text:'VLAN hopping'},
        {letter:'C',text:'On-path attack'},
        {letter:'D',text:'Phishing'}
      ],
      answer:['C'], sourceNumber:'Demo-5', page:'N10-009 Demo p.5', needs_visual:false
    }
  ];

  const bank = Array.isArray(window.N10009_BANK) ? window.N10009_BANK : [];
  const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const signatures = new Set(bank.map(q => norm(q.question)));
  let nextId = bank.reduce((m,q)=>Math.max(m,Number(q.id)||0),9000) + 1;
  let added = 0;

  for (const q of incoming) {
    const sig = norm(q.question);
    if (!sig || signatures.has(sig)) continue;
    bank.push({...q,id:nextId++,bank:'n10009'});
    signatures.add(sig);
    added++;
  }
  window.N10009_BANK = bank;
  console.info(`N10-009 demo addon: ${added} new question(s) added; duplicates skipped.`);
})();
