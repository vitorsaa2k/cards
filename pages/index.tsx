import { Button } from '@/components/common/button'


export default function Home() {


  
  return (
    <>
      <main className='w-screen h-screen flex justify-center items-center'>
          <section>
            <div className='bg-slate-500 p-4 rounded flex flex-col items-center'>
              Seja bem-vindo à plataforma de consulta do cliente!
              <Button>Já possuo uma conta</Button>
              <Button>Criar conta</Button>
              <Button >Pagina principal</Button>
            </div>
          </section>
      </main>
    </>
  )
}
