(() => {
  // Question-aware reasoning layer. Runs after reasoning-engine.js and replaces vague
  // category-level explanations with explanations tied to the actual stem and answers.
  const base = window.networkReasoning;
  if (typeof base !== 'function') return;

  const opt=(q,l)=>q.options?.find(o=>o.letter===l);
  const txt=(q,l)=>opt(q,l)?.text||l;
  const has=(s,re)=>re.test(String(s||''));

  const rules=[
    {
      match:q=>has(q.question,/leaf switches.*spine.*leaf|spine.*leaf.*leaf switches/i),
      topic:'Data Center Topologies & Routing',
      why:'In a spine-and-leaf fabric, leaf switches need Layer 3 multipath routing to reach the spine layer and other leaves. BGP is commonly used as the routing protocol for exchanging those routes, while ECMP is the forwarding method that can use multiple equal-cost spine paths at the same time.',
      hook:'Spine-leaf: BGP exchanges routes • ECMP uses equal-cost paths',
      wrong:{
        A:'STP prevents Layer 2 switching loops by blocking redundant links. A spine-and-leaf fabric is designed around Layer 3 routed links and ECMP, so STP is not the protocol the leaf switches use to exchange routes.',
        B:'ECMP is important in spine-and-leaf, but it is a multipath forwarding technique, not the routing protocol itself. BGP supplies the routing information that allows equal-cost paths to be installed.',
        D:'DHCP assigns IP configuration to clients. It does not exchange routing information between leaf and spine switches.'
      }
    },
    {
      match:q=>has(q.question,/resource records.*created.*dns zone|dns zone.*resource records.*created/i),
      topic:'DNS',
      why:'DNS resource records can be created manually by an administrator or dynamically by authorized clients/DHCP through dynamic DNS updates. Therefore, the complete answer is that records may be created either statically or dynamically.',
      hook:'DNS records: manual/static OR dynamic updates',
      wrong:{
        A:'DNS records are not limited to dynamic creation. Administrators can manually create records such as A, AAAA, CNAME, MX, and PTR records in a zone.',
        B:'DNS records are not limited to manual creation either. Dynamic DNS can automatically create or update records for hosts.',
      }
    },
    {
      match:q=>has(q.question,/ipv6.*starts with ['"]?2607|address starts with ['"]?2607/i),
      topic:'IPv6 Addressing',
      why:'An IPv6 address beginning with 2607 falls inside 2000::/3, the range used for global unicast addresses. Global unicast addresses are publicly routable in IPv6, so this address has global scope.',
      hook:'IPv6 2000::/3 = Global Unicast',
      wrong:{
        D:'Unique local IPv6 addresses use FC00::/7, most commonly FDxx prefixes. An address beginning with 2607 is not in FC00::/7; it is in the global-unicast 2000::/3 range.'
      }
    },
    {
      match:q=>has(q.question,/characteristics?.*describes? udp|describes? udp/i),
      topic:'Ports & Protocols',
      why:'UDP is connectionless: it sends datagrams without first establishing a session and does not provide TCP-style acknowledgments, retransmission, sequencing, or guaranteed delivery. That lower overhead makes UDP useful when speed and low latency matter more than reliability.',
      hook:'UDP = connectionless + best effort • TCP = reliable + connection-oriented',
      wrong:{
        B:'Guaranteed delivery is associated with TCP reliability mechanisms, not UDP. UDP does not acknowledge every datagram or retransmit missing data by itself.'
      }
    },
    {
      match:q=>has(q.question,/amount of data loss.*sustain.*time|data loss.*measured in time units|recovery point objective|\brpo\b/i),
      topic:'Business Continuity & Disaster Recovery',
      why:'RPO (Recovery Point Objective) is the maximum acceptable amount of data loss measured backward in time. For example, an RPO of four hours means recovery must restore data to a point no more than four hours before the outage.',
      hook:'RPO = how much DATA can be lost • RTO = how long service can be DOWN',
      wrong:{
        A:'MTD (Maximum Tolerable Downtime) is the longest total period a business process can remain unavailable before the impact becomes unacceptable. It measures tolerated downtime, not acceptable data loss.',
        C:'RTO measures the target time to restore a service after disruption. The question asks about acceptable data loss measured in time, which is RPO.',
      }
    },
    {
      match:q=>has(q.question,/0\.0\.0\.0\/0.*routing table|entry for 0\.0\.0\.0\/0/i),
      topic:'Routing',
      why:'0.0.0.0/0 matches every IPv4 destination because it has a zero-bit prefix. It is the default route used when no more-specific route matches the destination.',
      hook:'0.0.0.0/0 = default route = last resort',
      wrong:{}
    },
    {
      match:q=>has(q.question,/default port.*ldaps|ldap over ssl/i),
      topic:'Ports & Protocols',
      why:'LDAPS is LDAP protected with SSL/TLS and traditionally uses TCP port 636. Standard LDAP uses port 389.',
      hook:'LDAP 389 • LDAPS 636',
      wrong:{}
    },
    {
      match:q=>has(q.question,/payload of malware/i),
      topic:'Network Security',
      why:'The payload is the action malware performs after execution beyond simply reproducing or spreading itself—for example encrypting files, stealing information, opening a backdoor, or damaging data.',
      hook:'Malware delivery/spread gets it there • payload does the damage',
      wrong:{}
    },
    {
      match:q=>has(q.question,/fileless|does not write.*disk|memory-resident.*scripting/i),
      topic:'Network Security',
      why:'Fileless malware operates primarily in memory and often abuses trusted tools such as PowerShell, WMI, or other scripting engines rather than storing a traditional malicious executable on disk.',
      hook:'Fileless = memory + legitimate system tools',
      wrong:{}
    },
    {
      match:q=>has(q.question,/traffic.*recirculated.*amplified.*loops|loops.*switching topology/i),
      topic:'Switching & VLANs',
      why:'A Layer 2 loop can cause broadcast and unknown-unicast frames to circulate repeatedly. Because Ethernet frames have no Layer 2 TTL, copies multiply and consume bandwidth, producing a broadcast storm.',
      hook:'Switching loop → frames multiply → broadcast storm',
      wrong:{}
    },
    {
      match:q=>has(q.question,/maximum number of clients per ap|clients per ap/i),
      topic:'Wireless',
      why:'For Network+ planning questions, about 30 clients per access point is a commonly accepted design guideline. An AP may technically support more, but usable capacity depends on airtime, application load, channel width, interference, and client capabilities.',
      hook:'Planning guideline: ~30 clients/AP; airtime is the real limit',
      wrong:{}
    }
  ];

  window.networkReasoning=function(q,selectedLetters,correctLetters){
    const original=base(q,selectedLetters,correctLetters);
    const rule=rules.find(r=>r.match(q));
    if(!rule) return original;
    const wrong=(selectedLetters||[])
      .filter(l=>!(correctLetters||[]).includes(l))
      .map(l=>({
        letter:l,
        text:txt(q,l),
        why:rule.wrong?.[l] || `“${txt(q,l)}” does not satisfy what this question is asking. The key distinction is: ${rule.hook}`
      }));
    return {...original,topic:rule.topic,why:rule.why,hook:rule.hook,wrong};
  };
})();
