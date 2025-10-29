// Configuration Supabase pour Athlink
const SUPABASE_CONFIG = {
    url: 'https://ioyklugzwavjyondimwd.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlveWtsdWd6d2F2anlvbmRpbXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MjMyNDEsImV4cCI6MjA3NTQ5OTI0MX0.erXctfavoMVh_j_iy-uM7YPMwqktSSs1ZvS2gz9Q04w',
    serviceRoleKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlveWtsdWd6d2F2anlvbmRpbXdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTkyMzI0MSwiZXhwIjoyMDc1NDk5MjQxfQ.Y4CSvaF9w1Ji97UpwouzsfVvlK5v1dP1w0BcdwOF53U'
}

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG
}
