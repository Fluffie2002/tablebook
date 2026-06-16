$dir = "e:\Friend\frontend\public\images\restaurants"
$restaurants = @(
  @{ slug = 'warung-pak-din'; tags = 'food,asian,rice' },
  @{ slug = 'madam-lis-kitchen'; tags = 'chinese,food,dining' },
  @{ slug = 'saffron-lane'; tags = 'indian,curry,food' },
  @{ slug = 'bijan-heritage'; tags = 'food,asian,dining' },
  @{ slug = 'tiga-rasa-co'; tags = 'restaurant,food,plate' },
  @{ slug = 'kopitiam-lima-dua'; tags = 'coffee,cafe,food' }
)

foreach ($r in $restaurants) {
  for ($v = 1; $v -le 4; $v++) {
    $lock = ([int[]][char[]]"$($r.slug)-$v" | Measure-Object -Sum).Sum
    $url = "https://loremflickr.com/1200/800/$($r.tags)?lock=$lock"
    $dest = Join-Path $dir "$($r.slug)-$v.jpg"
    Write-Host "Downloading $($r.slug)-$v.jpg"
    Invoke-WebRequest -Uri $url -OutFile $dest -TimeoutSec 60
    $size = (Get-Item $dest).Length
    Write-Host "  saved $([math]::Round($size/1KB)) KB"
  }
}

$default = Join-Path $dir 'default.jpg'
Invoke-WebRequest -Uri 'https://loremflickr.com/1200/800/food,restaurant?lock=9999' -OutFile $default -TimeoutSec 60
Write-Host 'Done'
