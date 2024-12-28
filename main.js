var tickets = [{
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
    },];
var compareType = function (ticket) {
    var call = ticket.call, category = ticket.category;
    var normalizedCall = call.toLowerCase();
    var normalizedCategory = [
        category.department.toLowerCase(),
        category.product.toLowerCase(),
        category.problem.toLowerCase(),
    ];
    return normalizedCategory.some(function (item) { return normalizedCall.includes(item); });
};
var evaluateTickets = function (tickets) {
    var evaluatedTickets = [];
    for (var _i = 0, tickets_1 = tickets; _i < tickets_1.length; _i++) {
        var ticket = tickets_1[_i];
        ticket.compareResult = compareType(ticket);
        evaluatedTickets.push(ticket);
    }
    return evaluatedTickets;
};
var createReadableCategory = function (department, problem, product) {
    return department + '/' + problem + '/' + product;
};
var constructEvaluatedTicket = function (ticket) {
    var category = createReadableCategory(ticket.category.department, ticket.category.problem, ticket.category.product);
    return {
        call: ticket.call,
        category: category,
        evaluatedCategory: ticket.compareResult ? category : 'Análise manual'
    };
};
var showTickets = function (tickets) {
    for (var i = 0; i < tickets.length; i++) {
        console.log(constructEvaluatedTicket(tickets[i]));
    }
};
showTickets(evaluateTickets(tickets));
