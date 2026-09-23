import Button from '../components/ui/Button.jsx'

export default function NotFoundPage() {
  return (
    <div className="container not-found">
      <p className="eyebrow">Ошибка 404</p>
      <h1>Страница не найдена</h1>
      <p className="lead">
        Возможно, ссылка устарела или в адресе есть опечатка.
      </p>
      <Button to="/">Вернуться на главную</Button>
    </div>
  )
}
