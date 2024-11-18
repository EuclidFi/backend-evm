export function useDEZ() {
    const context = useContext(DEZContext);
    if (!context) {
        throw new Error('useDEZ must be used within a DEZProvider');
    }
    return context;
}
