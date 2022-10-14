const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sDia = document.querySelector('#m-dia')
const sFuncao = document.querySelector('#m-funcao')
const sHorario = document.querySelector('#m-horario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sDia.value = itens[index].dia
    sFuncao.value = itens[index].funcao
    sHorario.value = itens[index].horario
    id = index
  } else {
    sDia.value = ''
    sFuncao.value = ''
    sHorario.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.dia}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.horario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sDia.value == '' || sFuncao.value == '' || sHorario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].dia = sDia.value
    itens[id].funcao = sFuncao.value
    itens[id].horario = sHorario.value
  } else {
    itens.push({'dia': sDia.value, 'funcao': sFuncao.value, 'horario': sHorario.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
