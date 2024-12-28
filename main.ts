import { levenshtein } from "./levenshtein"

type Category = {
    department: string // TODO: turn into enum
    product: string   // TODO: turn into enum
    problem: string
}

type Ticket = {
    call: string,
    category: Category;
    compareResult?: boolean;
}

type EvaluatedTicket = {
    call: string;
    category: string
    evaluatedCategory: string
}

const tickets: Ticket[] = [{
    call: 'NÃO CONSIGO ACESSAR O PORTAL',
    category: {
        department: 'INFRA',
        product: 'NOTEBOOK',
        problem: 'ACESSOS',
        },
    },
    {
        call: 'NÃO CONSIGO ACESSAR O PORTAL',
        category: {
            department: 'CREDIARE',
            product: 'PORTAL',
            problem: 'ACESSOS',
        },
    },]

const compareType = (ticket: Ticket): boolean => {
    const { call, category } = ticket

    const normalizedCall = call.toLowerCase();
    const normalizedCategory = [
        category.department.toLowerCase(),
        category.product.toLowerCase(),
        category.problem.toLowerCase(),
    ];
    
    return normalizedCategory.some((item) => normalizedCall.includes(item));
}

const evaluateTickets = (tickets: Ticket[]) => {
    const evaluatedTickets: Ticket[] = []
    for (const ticket of tickets) {
        ticket.compareResult = compareType(ticket)
        evaluatedTickets.push(ticket)
    }

    return evaluatedTickets
};

const createReadableCategory = (department: string, problem: string, product: string): string => {
    return department + '/' + problem + '/' + product
}

const constructEvaluatedTicket = (ticket: Ticket): EvaluatedTicket => {
    const category = createReadableCategory(
        ticket.category.department, 
        ticket.category.problem, 
        ticket.category.product)

    return {
        call: ticket.call,
        category: category,
        evaluatedCategory: ticket.compareResult ? category : 'Análise manual'
    }
}

const showTickets = (tickets: Ticket[]) => {
    for (let i = 0; i < tickets.length; i++){
        console.log(constructEvaluatedTicket(tickets[i]))
    }
}

showTickets(evaluateTickets(tickets))

