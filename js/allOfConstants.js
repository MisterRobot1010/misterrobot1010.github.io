const allOfConstants = {
    //Columns in Excel File
    separatorOfTopic: "Tema [",
    columnForSubject: "Si el tema es docencia, indicar aquí la materia",
    allOfSubtopics: [
        {
            topic: "Docencia",
            subtopics: ["Programa de curso", "Trabajo escolar", "Exámen", "Curso completo", "Tésis", "Otros", "Documentos administrativos", "Plan de estudios", "Notas para alumnos"]
        },
        {
            topic: "Eclesiástico",
            subtopics: ["Administración parroquial", "Textos pastorales", "Teología", "Textos vaticanos", "Caballeros de Colón", "Actividades eclesiásticas", "Otros", "Asuntos diocesanos", "Espiritualidad"]
        },
        {
            topic: "Filosofía",
            subtopics: ["Metafísica", "Ética", "Ontología", "Estética", "Filosofía del lenguaje", "Filosofía de la religión", "Historia de la filosofía", "Sociología del conocimiento", "Náhuatl", "Humanismo", "Filosofía política", "Filosofía de la educación", "Filosofía de la ciencia"]
        },
        {
            topic: "Historia",
            subtopics: ["Regional", "Nacional", "Eclesiástica", "Indígena", "Mundial", "Arte"]
        },
        {
            topic: "Personal",
            subtopics: ["Cartas", "Cocina", "Documentos", "Estudios", "Otros", "Botánica", "Arte", "Cronista"]
        }
    ],
    columns: ["Autor", "Carpeta", "Código", "Fecha dd/mm/aaaa", "Lugar", "Marca temporal", "Observaciones", "Otros [Firma]", "Otros [Notas]", "Otros [Subrayado]", "Si el tema es docencia, indicar aquí la materia", "Tamaño del documento", "Tema: Filosofía [Filosofía]", "Tipo de documento", "Título", "Tema", "Subtema", "Materia"],
    columnsForShow: ["Autor", "Carpeta", "Código", "Fecha dd/mm/aaaa", "Lugar", "Observaciones", "Otros [Firma]", "Otros [Notas]", "Otros [Subrayado]", "Si el tema es docencia, indicar aquí la materia", "Tamaño del documento", "Tipo de documento", "Título", "Tema", "Subtema", "Materia"],
    omittedWordsInSearch: ["de", "del", "la", "el", "para", "por", "un", "unos", "unas", "una", "o", "a", "y", "pero", "uno"]
}