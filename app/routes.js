const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/applicant-type', function (req, res) {
  res.render('applicant-type')
})

router.post('/applicant-type', function (req, res) {
  const answer = req.session.data['applicant-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'applicant-type': 'Select who you are applying for.' }
    return res.render('applicant-type')
  }
  if (answer === 'myself') {
    return res.redirect('/disability-type')
  } else if (answer === 'someone-else') {
    return res.redirect('/relationship')
  }
  res.redirect('/relationship')
})

router.get('/relationship', function (req, res) {
  res.render('relationship')
})

router.post('/relationship', function (req, res) {
  const answer = req.session.data['relationship']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'relationship': 'Select your relationship to the person.' }
    return res.render('relationship')
  }
  if (answer === 'parent-guardian') {
    return res.redirect('/disability-type')
  } else if (answer === 'carer') {
    return res.redirect('/disability-type')
  } else if (answer === 'family') {
    return res.redirect('/disability-type')
  } else if (answer === 'friend') {
    return res.redirect('/ineligible-relationship')
  }
  res.redirect('/disability-type')
})

router.get('/ineligible-relationship', function (req, res) {
  res.render('ineligible-relationship')
})

router.get('/disability-type', function (req, res) {
  res.render('disability-type')
})

router.post('/disability-type', function (req, res) {
  const answer = req.session.data['disability-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'disability-type': 'Select the type of disability or condition.' }
    return res.render('disability-type')
  }
  if (answer === 'walking-difficulty') {
    return res.redirect('/age-check')
  } else if (answer === 'blind') {
    return res.redirect('/age-check')
  } else if (answer === 'arms') {
    return res.redirect('/age-check')
  } else if (answer === 'learning-disability') {
    return res.redirect('/age-check')
  } else if (answer === 'none') {
    return res.redirect('/ineligible-disability-type')
  }
  res.redirect('/age-check')
})

router.get('/ineligible-disability-type', function (req, res) {
  res.render('ineligible-disability-type')
})

router.get('/age-check', function (req, res) {
  res.render('age-check')
})

router.post('/age-check', function (req, res) {
  const answer = req.session.data['age-check']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'age-check': 'Select yes if they are 3 years old or over.' }
    return res.render('age-check')
  }
  if (answer === 'yes') {
    return res.redirect('/full-name')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-age-check')
  }
  res.redirect('/full-name')
})

router.get('/ineligible-age-check', function (req, res) {
  res.render('ineligible-age-check')
})

router.get('/full-name', function (req, res) {
  res.render('full-name')
})

router.post('/full-name', function (req, res) {
  const answer = req.session.data['full-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'full-name': 'Enter the full name of the person the badge is for.' }
    return res.render('full-name')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('BB')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
