export const initial = 'e0'

export const trans = {
  e0: {
    a: 'e1', b: 'inv', c: 'e4', d: 'e6', e: 'inv', non: 'smb'
  },
  e1: {
    a: 'inv', b: 'e2', c: 'inv', d: 'inv', e: 'inv', non: 'smb'
  },
  e2: {
    a: 'e3', b: 'inv', c: 'inv', d: 'inv', e: 'inv', non: 'smb'
  },
  e3: {
    a: 'inv', b: 'e0', c: 'inv', d: 'inv', e: 'inv', non: 'smb'
  },
  e4: {
    a: 'inv', b: 'inv', c: 'e5', d: 'e8', e: 'inv', non: 'smb'
  },
  e5: {
    a: 'inv', b: 'inv', c: 'e4', d: 'e6', e: 'inv', non: 'smb'
  },
  e6: {
    a: 'inv', b: 'inv', c: 'inv', d: 'inv', e: 'e7', non: 'smb'
  },
  e7: {
    a: 'inv', b: 'inv', c: 'inv', d: 'e8', e: 'inv', non: 'smb'
  },
  e8: {
    a: 'inv', b: 'inv', c: 'inv', d: 'inv', e: 'e9', non: 'smb'
  },
  e9: {
    a: 'inv', b: 'inv', c: 'inv', d: 'e6', e: 'inv', non: 'smb'
  },
  inv: {
    a: 'inv', b: 'inv', c: 'inv', d: 'inv', e: 'inv', non: 'inv'
  },
  smb: {
    a: 'smb', b: 'smb', c: 'smb', d: 'smb', e: 'smb', non: 'smb'
  }
}

export const finals = {
  e0: false,
  e1: false,
  e2: false,
  e3: false,
  e4: true,
  e5: false,
  e6: false,
  e7: true,
  e8: false,
  e9: false,
  inv: false,
  smb: false
}
