const express = require('express')
const router = express.Router()

// Move product data directly into the API
const products = [
  {
    "id": 1,
    "title": "Vintage IBM Model M Keyboard (1989)",
    "price": 129.99,
    "inventory": 3,
    "description": "Classic mechanical keyboard from IBM's golden era. Features the legendary buckling spring switches. Fully restored and USB-converted. A piece of computing history that still outperforms modern keyboards.",
    "image": "https://picsum.photos/400/300?random=1",
    "category": "Technology",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Amazing keyboard! The security of knowing each keystroke is registered perfectly makes this perfect for my penetration testing work.",
        "author": "T. Rabbit",
        "date": "2024-02-15"
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "Built like a tank! Though the IT guy who sold it to me seemed pretty stressed about letting it go...",
        "author": "CyberHunter",
        "date": "2024-02-10"
      }
    ]
  },
  {
    "id": 2,
    "title": "Original Fort Collins Sugar Beet Scale",
    "price": 449.99,
    "inventory": 1,
    "description": "Authentic industrial scale from the old Fort Collins Sugar Beet factory (circa 1903). A rare piece of local history, fully restored and functional. Perfect for display or conversation piece.",
    "image": "https://picsum.photos/400/300?random=2",
    "category": "Local History",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Mr. B from management was really helpful in authenticating this piece. Great addition to my collection!",
        "author": "Local History Buff",
        "date": "2024-01-20"
      },
      {
        "id": 2,
        "rating": 3,
        "comment": "Website checkout was a bit glitchy, but the scale itself is fantastic.",
        "author": "Antique Collector",
        "date": "2024-01-15"
      }
    ]
  },
  {
    "id": 3,
    "title": "Apple Macintosh SE/30 (1989)",
    "price": 799.99,
    "inventory": 2,
    "description": "Fully working Macintosh SE/30 with original 40MB hard drive and 4MB RAM. Includes original keyboard and mouse. Recently serviced and capacitors replaced.",
    "image": "https://picsum.photos/400/300?random=3",
    "category": "Technology",
    "reviews": [
      {
        "id": 1,
        "rating": 4,
        "comment": "The system admin who restored this did an amazing job, though I noticed some interesting configuration choices...",
        "author": "Security Researcher",
        "date": "2024-02-01"
      },
      {
        "id": 2,
        "rating": 5,
        "comment": "Perfect condition! Though the backend system charged me twice - might want to look into that ;)",
        "author": "RetroComputing",
        "date": "2024-01-25"
      }
    ]
  },
  {
    "id": 4,
    "title": "Horsetooth Rock Survey Equipment (1950s)",
    "price": 299.99,
    "inventory": 1,
    "description": "Original surveying transit used in the 1950s Horsetooth area development. Brass construction with leather case. A unique piece of local surveying history.",
    "image": "https://picsum.photos/400/300?random=4",
    "category": "Local History",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Fascinating piece of local history! The fox at the counter seemed to know everything about its authentication process.",
        "author": "HistoryHiker",
        "date": "2024-02-12"
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "Love it, but the website's admin panel was visible during checkout... might want to fix that!",
        "author": "MountainExplorer",
        "date": "2024-02-08"
      }
    ]
  },
  {
    "id": 5,
    "title": "Commodore 64 Complete System",
    "price": 349.99,
    "inventory": 2,
    "description": "Working Commodore 64 with 1541 disk drive, monitor, and original software collection. The best-selling computer model of all time, ready for retro gaming.",
    "image": "https://picsum.photos/400/300?random=5",
    "category": "Technology",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Perfect for my retro security research! Though I noticed some interesting default passwords still in place...",
        "author": "EthicalHacker",
        "date": "2024-02-14"
      },
      {
        "id": 2,
        "rating": 3,
        "comment": "Works great but the stressed-out IT guy needs help - saw him debugging the payment system for hours!",
        "author": "RetroGamer",
        "date": "2024-02-01"
      }
    ]
  },
  {
    "id": 6,
    "title": "CSU Veterinary School Microscope (1960s)",
    "price": 599.99,
    "inventory": 1,
    "description": "Professional-grade microscope from CSU's early veterinary program. Zeiss optics, excellent condition. Includes original wooden case and accessories.",
    "image": "https://picsum.photos/400/300?random=6",
    "category": "Scientific",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Beautiful piece! Mr. B's authentication certificate seems a bit outdated though.",
        "author": "VetCollector",
        "date": "2024-01-28"
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "Great condition. The sysadmin mentioned something about 'legacy database issues' during purchase.",
        "author": "LabEquipPro",
        "date": "2024-01-20"
      }
    ]
  },
  {
    "id": 7,
    "title": "Vintage New Belgium Brewing Equipment",
    "price": 899.99,
    "inventory": 1,
    "description": "Original small-batch brewing equipment from New Belgium's early days. Includes copper vessels and original thermometers. A piece of Fort Collins brewing history.",
    "image": "https://picsum.photos/400/300?random=7",
    "category": "Local History",
    "reviews": [
      {
        "id": 1,
        "rating": 4,
        "comment": "Authentic piece! Though their IT security seems as vintage as the equipment - saw plain text passwords on the invoice.",
        "author": "BrewCollector",
        "date": "2024-02-11"
      },
      {
        "id": 2,
        "rating": 5,
        "comment": "The tired-looking fox who helped me was super knowledgeable. Hope management gets him some help soon!",
        "author": "CraftBeerLover",
        "date": "2024-02-05"
      }
    ]
  },
  {
    "id": 8,
    "title": "Silicon Graphics Indigo2 Workstation",
    "price": 699.99,
    "inventory": 1,
    "description": "Professional 3D graphics workstation from the 90s. Used in early CGI production. Fully functional with original software.",
    "image": "https://picsum.photos/400/300?random=8",
    "category": "Technology",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Perfect for my security research lab! Noticed some SQL queries in the error messages though...",
        "author": "SecurityResearcher",
        "date": "2024-02-13"
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "Great machine. The admin mentioned needing to patch some vulnerabilities - hope he gets to it!",
        "author": "GraphicsVeteran",
        "date": "2024-02-07"
      }
    ]
  },
  {
    "id": 9,
    "title": "Antique Colorado A&M College Sign",
    "price": 1299.99,
    "inventory": 1,
    "description": "Original metal sign from when CSU was still Colorado A&M College (pre-1957). Excellent condition with original paint and mounting hardware.",
    "image": "https://picsum.photos/400/300?random=9",
    "category": "Local History",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Amazing find! Though someone should tell their sysadmin about the exposed admin directory...",
        "author": "CSUAlumni",
        "date": "2024-02-09"
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "The owner (Mr. B) really knows his history! Website needs some security updates though.",
        "author": "SignCollector",
        "date": "2024-02-03"
      }
    ]
  },
  {
    "id": 10,
    "title": "HP-35 Scientific Calculator",
    "price": 249.99,
    "inventory": 3,
    "description": "The world's first scientific pocket calculator from HP (1972). Fully functional with original case and manual. A cornerstone of Silicon Valley history.",
    "image": "https://picsum.photos/400/300?random=10",
    "category": "Technology",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Amazing calculator! The security of knowing each calculation is accurate makes this perfect for my financial research.",
        "author": "FinancialAnalyst",
        "date": "2024-02-15"
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "The checkout process was a bit glitchy, but the calculator itself is fantastic.",
        "author": "CalculatorCollector",
        "date": "2024-02-10"
      }
    ]
  },
  {
    "id": 11,
    "title": "Fort Collins Trolley Conductor's Bell",
    "price": 159.99,
    "inventory": 2,
    "description": "Authentic conductor's bell from the Fort Collins trolley system (early 1900s). Brass construction with original patina.",
    "image": "https://picsum.photos/400/300?random=11",
    "category": "Local History",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "The sound of this bell is like a piece of local history! The security of knowing each bell stroke is accurate makes this perfect for my historical research.",
        "author": "HistoryResearcher",
        "date": "2024-02-12"
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "The checkout process was a bit glitchy, but the bell itself is fantastic.",
        "author": "BellCollector",
        "date": "2024-02-08"
      }
    ]
  },
  {
    "id": 12,
    "title": "NeXT Computer System",
    "price": 2999.99,
    "inventory": 1,
    "description": "Complete NeXT Computer system from Steve Jobs' other company. The platform where the first web browser was developed. Includes original monitor and accessories.",
    "image": "https://picsum.photos/400/300?random=12",
    "category": "Technology",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "As a security consultant, I appreciate systems that are built to last. The admin mentioned something about 'legacy systems' though...",
        "author": "BriarwoodTech",
        "date": "2024-02-05"
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "Great machine! The checkout process was interesting - noticed some unusual API behavior.",
        "author": "WebDevPro",
        "date": "2024-01-30"
      }
    ]
  },
  {
    "id": 13,
    "title": "Horsetooth Marina Diving Equipment",
    "price": 399.99,
    "inventory": 2,
    "description": "Vintage scuba gear used by early Horsetooth Reservoir maintenance divers. Includes original regulators and depth gauges from the 1960s.",
    "image": "https://picsum.photos/400/300?random=13",
    "category": "Local History",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "The diving equipment is like a piece of local history! The security of knowing each piece is in good condition makes this perfect for my diving research.",
        "author": "DivingResearcher",
        "date": "2024-02-12"
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "The checkout process was a bit glitchy, but the equipment itself is fantastic.",
        "author": "DivingCollector",
        "date": "2024-02-08"
      }
    ]
  },
  {
    "id": 14,
    "title": "Sun SPARCstation 20",
    "price": 449.99,
    "inventory": 2,
    "description": "High-end Unix workstation from the mid-90s. Popular in scientific and engineering applications. Includes original keyboard and mouse.",
    "image": "https://picsum.photos/400/300?random=14",
    "category": "Technology",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "The SPARCstation 20 is like a piece of local history! The security of knowing each application runs smoothly makes this perfect for my scientific research.",
        "author": "ScientificResearcher",
        "date": "2024-02-12"
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "The checkout process was a bit glitchy, but the workstation itself is fantastic.",
        "author": "UnixCollector",
        "date": "2024-02-08"
      }
    ]
  },
  {
    "id": 15,
    "title": "Original Hewlett-Packard Oscilloscope",
    "price": 599.99,
    "inventory": 1,
    "description": "HP 120B oscilloscope from the company's early days. Fully functional and calibrated. A testament to HP's engineering excellence.",
    "image": "https://picsum.photos/400/300?random=15",
    "category": "Technology",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Fantastic condition! Noticed their backend is running an ancient version of Apache though.",
        "author": "TestEquipPro",
        "date": "2024-02-15"
      },
      {
        "id": 2,
        "rating": 4,
        "comment": "The overworked IT guy really knows his stuff. Someone get this fox a vacation!",
        "author": "VintageCollector",
        "date": "2024-02-10"
      }
    ]
  }
  // ... other products ...
]

// GET all products
router.get('/', (req, res) => {
  res.json({ products })
})

// Vulnerable inventory update endpoint
router.put('/update-inventory/:id', (req, res) => {
  const productId = parseInt(req.params.id)
  const { inventory } = req.body

  const product = products.find(p => p.id === productId)
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  // Update inventory without validation
  product.inventory = parseInt(inventory)

  // Check if inventory was set to suspicious value
  if (inventory >= 9999) {
    return res.json({
      message: 'Inventory updated',
      flag: 'noco{1nv3nt0ry_g0n3_cr4zy_9999}'
    })
  }

  res.json({ message: 'Inventory updated', product })
})

// Add this near the top of your routes
router.get('/test', (req, res) => {
  res.json({ message: 'Product API is working' })
})

module.exports = router
