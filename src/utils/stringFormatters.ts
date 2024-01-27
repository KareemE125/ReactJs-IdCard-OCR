export function convertFiledNameToLable(name: string): string {
    // Replace each capital letter with a space followed by the capital letter
    const formattedName = name.replace(/([A-Z])/g, ' $1');
    
    // Capitalize the first letter of the entire string
    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
}