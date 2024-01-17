import { render, screen, } from '@testing-library/react';
import parseJsonToReact from './method'
import sampleJson from "./sampleJson.json";



describe('ParseJson', ()=>{
    test('should render a Container component with children', () => {
        const parsedJSON = JSON.stringify(sampleJson)
        const reactElement = parseJsonToReact(JSON.parse(parsedJSON), 'ROOT')
        render(reactElement)

        const container = screen.getByTestId('Container');
        const img = screen.getByRole('img');
        const spanText1 = screen.getByText('Only texts');
        const spanText2 = screen.getByText('are allowed up here');
        const btn = screen.getByRole('button');
         expect(container).toBeInTheDocument();
         expect(img).toBeInTheDocument();
         expect(spanText1).toBeInTheDocument();
         expect(spanText2).toBeInTheDocument();
         expect(btn).toBeInTheDocument()
      });

      test("should display image with props", ()=>{
        const parsedJSON = JSON.stringify(sampleJson)
        const reactElement = parseJsonToReact(JSON.parse(parsedJSON), 'ROOT')
        render(reactElement)
        const img = screen.getByRole('img')
        expect(img).toHaveAttribute('src', 'http://placekitten.com/480/320')
        expect(img).toHaveAttribute('alt', 'New image')
        expect(img).toHaveAttribute('height', '320')
        expect(img).toHaveAttribute('width', '480')
      })

      test('should render card component with text and button', ()=>{
        const parsedJSON = JSON.stringify(sampleJson)
        const reactElement = parseJsonToReact(JSON.parse(parsedJSON), 'ROOT')
        render(reactElement)
        
        const card = screen.getByRole('div');
        const text = screen.getByText('Only texts');
        const btn = screen.getByRole('button');

        expect(card).toBeInTheDocument()
        expect(text).toBeInTheDocument()
        expect(btn).toHaveAttribute('text', "Only buttons down here")
        expect(btn).toBeInTheDocument()

      })
})