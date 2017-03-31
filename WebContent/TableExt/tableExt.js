sap.m.Table.extend('ColumnClickableTable', {
        metadata: {
            events : {
                columnPress: {}
            }
        },

        renderer: function(oRm, oControl) {
            sap.m.TableRenderer.render(oRm, oControl);
        },

        onAfterRendering: function() {
            var that = this;

            function colClick(idx, col) {
                col.css('cursor', 'pointer');
                col.children().each(function() {
                    $(this).css('cursor', 'pointer');
                });

                col.click(function() {
                    that.fireColumnPress({'columnIndex': idx, 'event': this});
                });
            }

            sap.m.Table.prototype.onAfterRendering.apply(this, arguments);
            var count = 0;
            this.$().find('th.sapMListTblHeaderCell').each(function() {
                colClick(count++, $(this));
            });
        }
        
});